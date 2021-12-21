---
title: "How to create a streaming AsyncAPI microservice using golang."
description: "Get started with streaming APIs and microservices defined via AsyncAPI using golang."
date: 2021-12-21T13:07:35-04:00
draft: false
menu: "articles"
strapline: "Using WebSockets and STOMP, we will create a streaming server and a client defined by an AsyncAPI contract, in ten minutes."
hero: "images/hero-images/asyncapi-streaming.png"
heroSVG: "images/hero-images/asyncapi-streaming.svg"
heroTitle: "Building event driven APIs described with AsyncAPI is easy."
heroAlt: "AsyncAPI streaming microservices with golang"
---

## Watch the video 
{{< youtube "TnxSlopBYgk" >}}

---

If you want to learn more about AsyncAPI, head over to [AsyncAPI.com](https://asyncapi.com) and find out more about the standard and the power it provides us.

Moving forward, I will _assume_ that you already know what AsyncAPI is and **_want to use it in your golang applications_**.

{{< default-box >}}
If you want to check out the source of this article [it can be found on GitHub](https://github.com/daveshanley/asyncapi-tutorials/tree/main/streaming).
{{< /default-box >}}

---

## 1. Getting started

We're going to create a **microservice** that exposes a single **streaming API** via **_AsyncAPI_**.

Our service will broadcast a message containing a random word every second to any subscribers of its channel (one-to-many).


{{< default-box >}}
Let's take a look at the [AsyncAPI contract for our Random Word Service](https://studio.asyncapi.com/?load=https://raw.githubusercontent.com/daveshanley/asyncapi-tutorials/main/specs/simple-stream.yaml).
{{< /default-box >}}

{{< inline-figure "*asyncapi-studio*" "AsyncAPI Studio is a nice tool for [visualizing our contract](https://studio.asyncapi.com/?load=https://raw.githubusercontent.com/daveshanley/asyncapi-tutorials/main/specs/simple-stream.yaml)." "Image of AsyncAPI studio with the contract we're using in this tutorial loaded." >}}

---

[View the contract source on GitHub](https://github.com/daveshanley/asyncapi-tutorials/blob/main/specs/simple-stream.yaml)

The service offers a **_single subscription channel_** only, defined as **topic/random-word**.

Every second, the service broadcasts a random word to all subscribers of that channel.

Let's look a the definition of the '**RandomWord**' message broadcast. 

{{< highlight yaml >}}
  messages:
    RandomWord:
      description: |
        A random word for you to enjoy. There is no way to know which word it will be.
      payload:
        allOf:
          - $ref: '#/components/schemas/TransportResponse'
          - type: object
            properties:
              payload:
                type: string
                description: A random english word.
                examples:
                    - pizza
                    - motorcycle
                    - guitars
{{< /highlight >}}


We can see that it's composed of two elements, properties defined by **TransportResponse** and a **payload** property, consisting of a _string_, which is our random word.

{{< card "Introducing Transport and Plank">}}
This tutorial uses [Plank](https://github.com/vmware/transport-go/tree/main/plank) to provide all the socket, message broker, boilerplate, and glue code you typically need to implement AsyncAPI services.

[Plank](https://github.com/vmware/transport-go/tree/main/plank) is a part of [Transport](https://github.com/vmware/transport-go), which operates as an asynchronous application framework for go. 

Transport will wrap any response emitted by a service with these properties and make the service response available via the '**payload**' value. The '**payload**' can be an object, a primitive, or a string. 
{{< /card >}}

---

## 2. Creating our Random Word Service

The output of our Random Word Service will be just a string, so the payload of our API response is that random word that our service emits.

Let's start by importing Transport into a new project.

{{< default-box >}}
{{< highlight zsh >}}
go get github.com/vmware/transport-go
{{< /highlight >}}
{{</ default-box >}}

Next, let's create the directory in which our AsyncAPI enabled services will live.

{{< default-box >}}
{{< highlight zsh >}}
mkdir services
{{< /highlight >}}
{{</ default-box >}}

Now we can create our new Random Word Service, create a new file named '[word_service.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/streaming/services/word_service.go)'

{{< highlight go >}}
package services

import (
    "math/rand"
    "reflect"
    "github.com/google/uuid"
    "github.com/robfig/cron/v3"
    "github.com/vmware/transport-go/model"
    "github.com/vmware/transport-go/service"
)

const (
    RandomWordChannel = "random-word" // matches asyncapi destination channel.
)

// RandomWordService will broadcast a random word on the "simple-stream" channel, every one second.
type RandomWordService struct {
    words         []string                  // list of random words.
    transportCore service.FabricServiceCore // reference to transport services we will need later on.
    readyChan     chan bool                 // once we're ready, let plank know via this channel.
    cronJob       *cron.Cron                // cronjob that runs every 1s.
}

// NewRandomWordService will return a new instance of RandomWordService
func NewRandomWordService() *RandomWordService {
    return &RandomWordService{}
}
{{< /highlight>}}
The '**RandomWordService**' struct defines a string slice named '**words**', our random word broadcast source. It also defines a pointer to '**transportCore**', which provides access to Transport context and other useful features. 

The service also defines a '**readyChan**', which lets Plank know that the service has loaded up our random words and is ready to go.

The last property is a pointer to a [cron job](https://github.com/robfig/cron/v3) that will allow us to execute something over and over, **_forever_**.

---

## 3. Generating random words

Before broadcasting random words, we need to add logic that generates a pool of random words from which to pick.

{{< highlight go >}}
// Init will fire when our service is being registered by Plank. 
func (rws *RandomWordService) Init(core service.FabricServiceCore) error {

    // capture a reference to transport core services.
    rws.transportCore = core
    return nil
}

// OnServiceReady fires once Plank has all services loaded and ready to run. 
func (rws *RandomWordService) OnServiceReady() chan bool {
    rws.readyChan = make(chan bool, 1)

    // fetch a list of random words (which runs asynchronously), so it immediately returns.
    rws.fetchRandomWords()

    return rws.readyChan
}
{{< /highlight >}}
'**Init**' and '**OnServiceReady**' are lifecycle hooks. They fire after Plank loads the service ('**_Init_**'), and Once Plank is ready to run the service ('**_OnServiceReady_**'). 

'**OnServiceReady**' Returns a _boolean_ chan that Plank will listen for a signal on before completing activation. We capture a pointer to it named '**readyChan**'

---

### 3.1  Using another API to generate a list of random words.

We call '**fetchRandomWords**', which makes an API call using a built-in REST Service provided by Transport.

{{< highlight go>}}
// fetchRandomWords will call a public REST endpoint that very kindly returns random words.
func (rws *RandomWordService) fetchRandomWords() {

    restRequest := &service.RestServiceRequest{
        Uri:          "https://random-word-api.herokuapp.com/word?number=500",
        Method:       "GET",
        ResponseType: reflect.TypeOf(rws.words),
    }

    // Transport provides a REST Service that makes this API call and provides handlers for the result.
    rws.transportCore.RestServiceRequest(restRequest,
        rws.handleWordFetchSuccess, // handle a successful API call.
        rws.handleWordFetchFailure) // handle a failed API call.
}
{{< /highlight >}}

It will call a public API (https://random-word-api.herokuapp.com) that will generate random words for us. 

We ask the API for 500 random words via the REST Service and then handle the success or failure of that API call by providing success and failure functions as handlers.

---

### 3.2 Handling a successful random word API call

{{< highlight go>}}
// handleWordFetchSuccess will parse a successful incoming word response from our source API.
func (rws *RandomWordService) handleWordFetchSuccess(response *model.Response) {

    // set the word list to the response returned by the REST API Call.
    rws.words = response.Payload.([]string)

    // send a signal down our ready channel, so Plank knows to continue.
    rws.readyChan <- true
}
{{< /highlight >}}
In our success handler '**handleWordFetchSuccess**', we cast the response of the API call into a '**[]string**' slice. We send a bool down our '**readyChan**' to alert Plank that we're ready to go.

### 3.3 Handling a failed random word API call

If our failure handler '**handleWordFetchFailure**' activates, we make up some random words of our own and proceed anyway. The list isn't very long, but it still fulfills the contract.

{{< highlight go >}}
// handleWordFetchFailure will parse a failed random word API request.
func (rws *RandomWordService) handleWordFetchFailure(response *model.Response) {

    // now we have no data, so make something up using some hard coded values.
    rws.words = []string{"magnum", "fox", "kitty", "cotton", "ember"}

    // we have a back up data-set loaded.
    rws.readyChan <- true
}
{{< /highlight >}}

---

## 4. Adding the cron job

Next, we add code that sets up a repeating cron job. It will send a broadcast message every second to all channel subscribers containing a random word using a simple function that picks it from our service's list in memory.

{{< highlight go >}}
// fireRandomWords will create a cron job that repeats every minute, that sends a message to all subscribers
// every minute. We then capture a pointer to that cronjob on our RandomWordService.
func (rws *RandomWordService) fireRandomWords() {

    // function to fire every second.
    var fireMessage = func() {
        id := uuid.New()

        // send a message containing a random word.
        rws.transportCore.SendResponse(&model.Request{Id: &id}, rws.getRandomWord())
    }
    rws.cronJob = cron.New()
    rws.cronJob.AddFunc("@every 1s", fireMessage)
    rws.cronJob.Start()
}

// getRandomWord will return a random word from our in memory list.
func (rws *RandomWordService) getRandomWord() string {
    return rws.words[rand.Intn(len(rws.words)-1)]
}
{{< /highlight >}}

We need to update both our REST Service API '**handleWordFetchSuccess**' and '**handleWordFetchFailure**' handlers to call this new method.

It will ensure the service broadcasts an actual list of random words regardless of success or failure to obtain that data.


{{< highlight go >}}
func (rws *RandomWordService) handleWordFetchFailure(response *model.Response) {
    ... 
    // start random word cron job.
    rws.fireRandomWords()
    ...
}

func (rws *RandomWordService) handleWordFetchSuccess(response *model.Response) {
    ... 
    // start random word cron job.
    rws.fireRandomWords()
    ...
}
{{< /highlight >}}

---

## 5. Add in remaining lifecycle methods

The last step of building our streaming service is to add in a few more Plank lifecycle methods. First, we want to stop our cron job cleanly when we're shutting down Plank, so we use '**OnServerShutdown**'.

{{< highlight go >}}
// OnServerShutdown will stop the cronjob firing cleanly when Plank shuts down.
func (rws *RandomWordService) OnServerShutdown() {
    rws.cronJob.Stop()
}
{{< /highlight >}}


We don't need to implement the second and third methods, as we don't need them for this tutorial. However, we still need to add them to ensure the contract Plank requires is fulfilled.

{{< highlight go >}}
// GetRESTBridgeConfig is not used by this service.
func (rws *RandomWordService) GetRESTBridgeConfig() []*service.RESTBridgeConfig { return nil }

// HandleServiceRequest is not used by this servuce.
func (rws *RandomWordService) HandleServiceRequest(r *model.Request, c service.FabricServiceCore){}
{{< /highlight >}}

Our streaming service is complete; now it's time to serve it via Plank. 

---

## 6. Creating the server to run the service

Let's create a new directory named '_server_' and add '[server.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/streaming/server/server.go)' to it. 

{{< default-box >}}
{{< highlight zsh >}}
mkdir server
{{< /highlight >}}
{{</ default-box >}}

The '**main**' function first creates a new instance of Plank that we name '**platformServer**' using a default configuration.

{{< highlight go >}}
package main

import (
    "os"
    "github.com/daveshanley/asyncapi-tutorials/streaming/services"
    "github.com/vmware/transport-go/plank/pkg/server"
    "github.com/vmware/transport-go/plank/utils"
)

// main will create a new instance of plank using a default configuration.
func main() {

    // create a default server configuration.
    serverConfig, err := server.CreateServerConfig()
    if err != nil {
        utils.Log.Fatalln(err)
        return
    }

    // create a new platform server from our configuration.
    platformServer := server.NewPlatformServer(serverConfig)

    // register our RandomWordService with our platform server.
    if err = platformServer.RegisterService(
            services.NewRandomWordService(), 
            services.RandomWordChannel); err != nil {
        utils.Log.Fatalln(err)
        return
    }

    // register a system channel with the platform, so we can catch interrupts and shut down cleanly.
    syschan := make(chan os.Signal, 1)

    // start plank and start streaming random words to everyone.
    platformServer.StartServer(syschan)
}
{{< /highlight >}}

Next, we create a new instance of '**RandomWordService**' and register with '**platformServer**' This will run the '**Init**' and '**OnServiceReady**' methods mentioned earlier.

The last step is to capture any operating system interrupt commands (_like Ctrl-C_) to shut down the platform **_cleanly_** and pass them to the '**platformServer**' pointer.

---

## 7. Boot the server

{{< default-box >}}
{{< highlight zsh >}}
go run server/server.go
{{< /highlight >}}
{{< /default-box >}}

{{< inline-figure "*plank-running*" "Random Word Service is up and running" "Image of a console window, showing the Plank boot screen with Plank running the new service." >}}

You should see the Plank boot screen, which tells you that the platform is up and running on **_localhost_** on port **30080**. The '**_Fabric endpoint_**' is a WebSocket endpoint that is open and listening for STOMP connections.

> How do we **_consume_** it however?

---

## 8. Create a client to connect and listen to the word stream

Let's write a client to connect to our new local broker, subscribe to our new service broadcasting on '**/topic/random-word**', listen for **_ten_** random words and then disconnect.

Let's create a new file called '[client.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/streaming/client.go)'

{{< highlight go >}}
package main

import (
    "encoding/json"
    "sync"
    "github.com/vmware/transport-go/bridge"
    "github.com/vmware/transport-go/bus"
    "github.com/vmware/transport-go/model"
    "github.com/vmware/transport-go/plank/utils"
)

func main() {

    // create a message broker connector config and connect to
    // localhost over WebSocket on port 30080.
    config := &bridge.BrokerConnectorConfig{
        Username:   "guest",            // not required for demo, but our API requires it.
        Password:   "guest",            // ^^ same.
        ServerAddr: "localhost:30080",  // our local plank instance, running RandomWordService
        UseWS:      true,               // connect over websockets
        WebSocketConfig: &bridge.WebSocketConfig{   // configure websocket
            WSPath: "/ws",                          // websocket endpoint
            UseTLS: false,                          // this isn't required locally
        }}
{{< /highlight >}}

{{< code-split >}}First, we create a new message broker configuration that defines '**localhost:30080**' as our server address and that we want to use WebSockets. We set the WebSocket path to '**/ws**', which is the default for Plank.{{< /code-split >}}

{{< highlight go >}}
    // get a pointer to transport
    b := bus.GetBus()

    // get a pointer to transport's channel manager
    cm := b.GetChannelManager()   
{{< /highlight >}}

{{< code-split >}}Next, we grab a couple of pointers to the event bus and bus channel manager provided by Transport.{{< /code-split >}}

{{< highlight go >}}
    // connect to localhost:30080
    c, err := b.ConnectBroker(config)
    if err != nil {
        utils.Log.Fatalf("unable to connect to %s, error: %v", config.ServerAddr, err.Error())
    }  
{{</ highlight >}}

{{< code-split >}}Once we have those pointers, we can connect to our Plank server running locally on port **30080**. Now, let's create a channel on our application event bus called '**my-local-word-stream**,' and then we create a stream handler that captures all messages on that channel.{{< /code-split >}}

{{< highlight go >}}
    // create a local channel on the bus that we want to listen to in our application.
    myLocalChan := "my-local-word-stream"
    cm.CreateChannel(myLocalChan)
{{</ highlight >}}

{{< code-split >}}Next, we map our application channel '**my-local-word-stream**' to the AsyncAPI channel defined by our service '**/topic/random-word**'.{{< /code-split >}}

{{< info-box >}}Transport defines '**_Galactic Channels_**' as event bus channels mapped to an AsyncAPI channel or Message Broker destination.{{< /info-box >}}

{{< code-split >}}We can listen to a channel on our event bus by using the '**ListenStream**' method. It will return a stream handler that we will define as '**handler**'.{{< /code-split >}}


{{< highlight go >}}
    // listen to stream of messages coming in on channel, a handler is returned
    // that allows you to add in lambdas that handle your success messages, and your errors.
    handler, _ := b.ListenStream(myLocalChan)

    // mark our local 'my-local-word-stream' myLocalChan as 'galactic' and map it to our connection and
    // the /topic/random-word service
    err = cm.MarkChannelAsGalactic(myLocalChan, "/topic/random-word", c)
    if err != nil {
        utils.Log.Fatalf("unable to map local channel to broker destination: %e", err)
    }
{{</ highlight >}}

{{< code-split >}}Our '**handler**' will allow us to register functions that capture all messages and errors. We don't want to stream forever, so let's put a ceiling of ten on our stream by using a '**WaitGroup**'{{< /code-split >}}

{{< highlight go >}}
    // create a wait group that will wait 10 times before completing.
    var wg sync.WaitGroup
    wg.Add(10)
{{</ highlight >}}

{{< code-split >}}Now we have our stream handler and our wait group defined, we can define functions that handle incoming messages and errors.{{< /code-split >}}
{{< code-split >}}If you recall the [AsyncAPI contract](https://studio.asyncapi.com/?load=https://raw.githubusercontent.com/daveshanley/asyncapi-tutorials/main/specs/simple-stream.yaml), All responses that use Plank over AsyncAPI are an object that Transport provides containing a '**Payload**' property.{{< /code-split >}}


{{< highlight go >}}
    // start and keep listening
    handler.Handle(
        func(msg *model.Message) {

            var randomWord string
            msg.CastPayloadToType(&randomWord)
{{</ highlight >}}

{{< code-split >}}We will log it out to the console (because it's just a string) and then mark our wait group as done, incrementing its internal counter.{{< /code-split >}}

{{< highlight go >}}
            // log it out.
            utils.Log.Infof("Random word: %s", value)

            wg.Done()
        },
        func(err error) {
            utils.Log.Errorf("error received on channel: %e", err)
        })

    // wait for 10 ticks of the stream, then we're done.
    wg.Wait()
{{</ highlight >}}

{{< code-split >}}After ten messages from our stream, the '**WaitGroup**' will complete. We can clean things up by closing our stream handler and marking our application bus channel as local. Our client will unsubscribe automatically from '**/topic/random-word**' on our broker.{{< /code-split >}}

{{< highlight go >}}
    // close our handler, we're done.
    handler.Close()

    // mark channel as local (unsubscribe from /topic/random-word)
    cm.MarkChannelAsLocal(myLocalChan)
{{</ highlight >}}

{{< code-split >}}Disconnecting is the last step.{{< /code-split >}}

{{< highlight go >}}
    // disconnect from our broker.
    c.Disconnect()
}
{{</ highlight >}}


---

## 9. Run the client

{{< default-box >}}
{{< highlight zsh >}}
go run client.go
{{< /highlight >}}
{{< /default-box >}}

You should see Ten random words print out to the console after ten seconds.

{{< inline-figure "*client-output*" "Ten random words arriving as a stream that ticks every second." "Image of a console window, showing the the log output of ten random words." >}}

And we're done!
 
---

All the code from this tutorial [can be found on GitHub](https://github.com/daveshanley/asyncapi-tutorials/tree/main/streaming)

- [Streaming AsyncAPI Specification](https://github.com/daveshanley/asyncapi-tutorials/blob/main/specs/simple-stream.yaml)
- [client.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/streaming/client.go)
- [server.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/streaming/server/server.go)
- [word_service.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/streaming/services/word_service.go)

Head over to [transport-bus.io](https://transport-bus.io) if you would like to learn more about Transport as a tool for building full stack asynchronous applications.
