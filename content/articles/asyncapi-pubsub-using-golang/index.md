---
title: "How to create an event-driven API via AsyncAPI using golang."
description: "Get started with event-driven APIs, Pub-Sub and microservices defined via AsyncAPI using golang."
date: 2021-12-16T13:07:35-04:00
draft: false
menu: "articles"
strapline: "Using WebSockets and STOMP, we will create Pub-Sub server and a client defined by an AsyncAPI contract, in ten minutes."
hero: "images/hero-images/asyncapi-pubsub.png"
heroSVG: "images/hero-images/asyncapi-pubsub.svg"
heroTitle: "Building event driven and Pub-Sub APIs described with AsyncAPI is easy."
heroAlt: "AsyncAPI streaming microservices with golang"
---

## Watch the video 
{{< youtube "NawZ-lCTl70" >}}

--- 
If you want to learn more about AsyncAPI, head over to [AsyncAPI.com](https://asyncapi.com) and find out more about the standard and the power it provides us.

Moving forward, I will _assume_ that you already know what AsyncAPI is and **_want to use it in your golang applications_**.


{{< default-box >}}
If you want to check out the source of this article [it can be found on GitHub](https://github.com/daveshanley/asyncapi-tutorials/tree/main/pub-sub).
{{< /default-box >}}

---

## 1. Getting started

We're going to create a microservice that exposes _Publish_ and _Subscribe_ endpoints defined by AsyncAPI. We will publish requests to one channel and listen for responses on another.

To learn how to [create a streaming AsyncAPI microservice]({{< ref "/articles/asyncapi-streaming-using-golang" >}}) if Pub-Sub isn't quite what you're looking for.

We're going to create a 'Terrible Joke' service. It will listen for an incoming '**JokeRequest'** on a channel (_Publish_) and then publish a '**JokeResponse**' response to a different outbound channel (_Subscribe_)


{{< default-box >}}
Let's take a look at the [AsyncAPI contract for our Terrible Joke Service](https://studio.asyncapi.com/?load=https://raw.githubusercontent.com/daveshanley/asyncapi-tutorials/main/specs/pub-sub.yaml).
{{< /default-box >}}


{{< inline-figure "*asyncapi-studio*" "AsyncAPI Studio is a nice tool for [visualizing our contract](https://studio.asyncapi.com/?load=https://raw.githubusercontent.com/daveshanley/asyncapi-tutorials/main/specs/pub-sub.yaml)." "Image of AsyncAPI studio with the contract we're using in this tutorial loaded." >}}


We ask for a Joke by publishing a '**JokeRequest**' to '**pub/queue/joke-service**' and then listen for our response on '**queue/joke-service**'.

Let's look a the definition of the '**JokeResponse**' message broadcast.

{{< highlight yaml >}}
messages:
    JokeResponse:
      description: |
        A response to a `JokeRequest`. Payload is a `Joke`.
      payload:
        allOf:
          - $ref: '#/components/schemas/TransportResponse'
          - type: object
            properties:
              payload:
                $ref: '#/components/schemas/Joke'

{{</ highlight >}}


We can see that it's composed of two elements, properties defined by `TransportResponse` and a payload property, consisting of a `Joke` object.

{{< highlight yaml >}}
components:
  schemas:
    Joke:
      description: >
        `Joke` represents the exact API response that is delivered via the icanhazdadjoke.com API. 
      type: object
      properties:
        id:
          description: >
           An alphanumeric string identifying this joke, via icanhazdadjoke.com
          type: string
          examples:
            - M7wPC5wPKBd
            - MRZ0LJtHQCd
            - usrcaMuszd
        joke:
          description: >
           A random joke from icanhazdadjoke.com. Probably not very funny but may crack a smile.
          type: string
          examples:
            - What kind of magic do cows believe in? MOODOO.
            - My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.
            - What do you call a fly without wings? A walk.
        status:
          description: >
            HTTP status code of the API call, should be *200* unless something went wrong.
          type: number
          format: int32
          examples:
            - 200
{{< /highlight >}}

Our '**Joke**' object is pretty simple, with only three properties. '**id**' represents the joke ID returned by our source API, '**joke**' is the joke's actual string value, and '**status**' is the HTTP Code produced by the source API. 

{{< card "Introducing Transport and Plank">}}
This tutorial uses [Plank](https://github.com/vmware/transport-go/tree/main/plank) to provide all the socket, message broker, boilerplate, and glue code you typically need to implement AsyncAPI services.

[Plank](https://github.com/vmware/transport-go/tree/main/plank) is a part of [Transport](https://github.com/vmware/transport-go), which operates as an asynchronous application framework for go. 

Transport will wrap any response emitted by a service with these properties and make the service response available via the '**payload**' value. The '**payload**' can be an object, a primitive, or a string. 
{{< /card >}}

---

## 2. Creating our terrible joke service

Let's start by importing Transport into a new project.

{{< highlight zsh >}}
go get github.com/vmware/transport-go
{{< /highlight >}}

Next, let's create the directory in which our AsyncAPI enabled services will live.

{{< highlight zsh >}}
mkdir services
{{< /highlight >}}

Now we can create our new Joke Service, create a new file named '[joke_service.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/pub-sub/services/joke_service.go)'.

{{< highlight go >}}
package services

import (
    "fmt"
    "net/http"
    "reflect"
    "github.com/google/uuid"
    "github.com/vmware/transport-go/model"
    "github.com/vmware/transport-go/service"
)

const (
    JokeServiceChannel = "joke-service" // matches asyncapi destination channel.
)

// Joke is a representation of what is returned by our providing JokeAPI.
type Joke struct {
    Id     string `json:"id"`
    Joke   string `json:"joke"`
    Status int    `json:"status"`
}

// JokeService will return a terrible joke, on demand.
type JokeService struct{}

// NewJokeService will return an instance of JokeService.
func NewJokeService() *JokeService {
    return &JokeService{}
}
{{</ highlight >}}

The `JokeService` struct has no properties of its own, unlike the [Streaming example]({{< ref "articles/asyncapi-streaming-using-golang" >}}).

---

### 2.1 Initializing the service

We use Plank's `Init` lifecycle method to automatically set outbound headers commonly required for JSON-based applications.

{{< highlight go >}}
// Init will fire when the service is being registered by Plank.
func (js *JokeService) Init(core service.FabricServiceCore) error {

    // JokeService always returns JSON objects as responses. Set default 'application/json' headers.
    core.SetDefaultJSONHeaders()
    return nil
}
{{< /highlight >}}

---

### 2.2 Handling published requests/events

Next, we implement the `HandleServiceRequest` method. This method should act as a delegator, deciding where to send each request based on the `Request` property of the `model.Request` pointer.

{{< highlight go >}}
// HandleServiceRequest will handle icoming requests from event bus on our service channel.
func (js *JokeService) HandleServiceRequest(request *model.Request, core service.FabricServiceCore) {
    switch request.Request {
    case "get-joke":
        js.getJoke(request, core)
    default:
        core.HandleUnknownRequest(request)
    }
}
{{< /highlight >}}

The `Request` property should match the `operationId` of the AsyncAPI contract.

We're only interested in one operation in this service, `get-joke`. Let's send our request over to a handler method we're going to call `getJoke`.

{{< info-box >}}
We can let a default handler deal with any other kind of message/request that comes in that isn't a 'get-joke' command; as unknown.
{{< /info-box >}}

---

### 2.3 Requesting a joke from another API.

`getJoke` will use a simple REST Service built into the core of Transport. The REST Service makes it super easy to call an API to get our joke.

{{< highlight go >}}
// getJoke calls our terrible joke service, and returns the response or error back to the requester.
func (js *JokeService) getJoke(request *model.Request, core service.FabricServiceCore) {

    // make API call using inbuilt RestService to make network calls. Use the wonderful icanhazdadjoke.com API.
    core.RestServiceRequest(&service.RestServiceRequest{
        Uri:    "https://icanhazdadjoke.com",
        Method: "GET",
        Headers: map[string]string{
            "Accept": "application/json",
        },
{{< /highlight >}}
{{< code-split >}}Using reflection in our REST Service call, we set the `ResponseType` as a `Joke` type.{{< /code-split >}}
{{< highlight go >}}
        ResponseType: reflect.TypeOf(&Joke{}),
{{< /highlight >}}

{{< code-split >}}We then provide success and error handlers for our REST Service Call. There isn't much to do with a successful response other than passing the `Joke` object back to the consumer.{{< /code-split >}}

{{< highlight go >}}
    }, func(response *model.Response) { // success handler function
        // send back a successful joke.
        core.SendResponse(request, response.Payload.(*Joke))
{{< /highlight >}}

{{< code-split >}}The same can be said for our error handler. We're just going to create an error response and send it back to our consumers if anything goes wrong with the API call.{{< /code-split >}}

{{< highlight go >}}
    }, func(response *model.Response) { // error handler function
        fabricError := service.GetFabricError("API Failed", response.ErrorCode, response.ErrorMessage)
        core.SendErrorResponseWithPayload(request, 
            response.ErrorCode, 
            response.ErrorMessage, 
            fabricError)
    })
}
{{< /highlight >}}

---

## 3. Exposing the service via REST

If we want to also expose this AsyncAPI Pub-Sub service over a RESTful transport using OpenAPI, Plank provides us with this helpful lifecycle hook called `GetRESTBridgeConfig`.

Plank makes it easy to 'bridge' Synchronous and Asynchronous APIs together by allowing services to provide a `RESTBridgeConfig` (or not). 

The config tells Plank the service's channel, the path to use, the HTTP request type, and options for allowing _OPTIONS_ and _HEAD_ requests.

{{< highlight go >}}
// GetRESTBridgeConfig returns a config for a REST endpoint for this Joke Service
func (js *JokeService) GetRESTBridgeConfig() []*service.RESTBridgeConfig {
    return []*service.RESTBridgeConfig{
        {
            ServiceChannel: JokeServiceChannel, // where is this service running?
            Uri:            "/rest/joke",       // what path do you want to map to this service?
            Method:         http.MethodGet,     // which method on this path should we map?
            AllowHead:      true,               // can the client send a HEAD request on this path?
            AllowOptions:   true,               // can the client send an OPTIONS request on this path?
            FabricRequestBuilder: func(w http.ResponseWriter, r *http.Request) model.Request {

                // Plank will essentially call this service like any other for every inbound HTTP request
                // so we create a message on behalf of the client.
                return model.Request{
                    Id:                &uuid.UUID{},
                    Request:           "get-joke", // which command do we want to run?
                    BrokerDestination: nil,        // not used in this demo.
                }
            },
        },
    }
}
{{< /highlight >}}

Converting everything to an asynchronous event call. The bridge connects REST endpoints with event bus calls. We tell Plank how to call our Joke service for each REST endpoint we want to define.

All that's left is to implement some other lifecycle events. Plank requires them, but we don't need them in this tutorial.

`OnServerShutdown` is used to cleanly end long-running tasks the service may be operating. We're not doing that in this service, so we don't need to do anything here.

{{< highlight go >}}
// OnServerShutdown is not implemented in this service.
func (js *JokeService) OnServerShutdown() {}
{{< /highlight >}}

Lastly, `OnServiceReady` is used to set up the service before making it available.  We don't set anything up in this service, so we can simply return a pre-fired boolean chan here, which allows the service to be available immediately. 

{{< highlight go >}}
// OnServiceReady has no functionality in this service, so it returns a pre-fired channel.
func (js *JokeService) OnServiceReady() chan bool {
	// ready right away, nothing to do.
	readyChan := make(chan bool, 1)
	readyChan <- true
	return readyChan
}
{{< /highlight >}}



Our service is ready! Now we need to create an instance of Plank, load up our service, and try it out.

---

## 4. Create an application server to run the service

Create a new directory called 'server'

{{< highlight zsh >}}
mkdir server
{{< /highlight >}}


Next, create a new file called '[server.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/pub-sub/server/server.go)'

Create a new instance of Plank by using a default Plank server configuration, running on **_localhost_** on port **30080**.

{{< highlight go >}}
package main
import (
    "os"
    "github.com/daveshanley/asyncapi-tutorials/pub-sub/services"
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

   
{{< /highlight >}}

{{< code-split >}}Then register the `JokeService` with Plank by using our `NewJokeService` function and the `JokeServiceChan` constant defined by our service.{{< /code-split >}}

{{< highlight go >}}
    // register our JokeService with our platform server.
    if err = platformServer.RegisterService(services.NewJokeService(), 
                services.JokeServiceChannel); err != nil {
        
        utils.Log.Fatalln(err)
        return
    }    
{{< /highlight >}}

{{< code-split >}}Lastly, we create an `os.Signal` chan and pass it to Plank to start things up. This is used by Plank to capture interrupts (like Ctrl-C).{{< /code-split >}}

{{< highlight go >}}

    // register a system channel with the platform, so we can catch interrupts and shut down cleanly.
    syschan := make(chan os.Signal, 1)

    // start plank and start listening for requests.
    platformServer.StartServer(syschan)
}
{{< /highlight >}}


Now we can boot up Plank and see our Terrible Joke Service running.

---

## 5. Boot the service and try it out


{{< highlight zsh >}}
go run server/server.go
{{< /highlight >}}


{{< inline-figure "*plank-running*" "Our terrible joke service is up and running" "Image of a console window, showing the Plank boot screen with Plank running the new service." >}}

The Plank boot screen should appear, and the following should be seen in the console.


{{< highlight zsh >}}
Service '*services.JokeService' registered at channel 'joke-service'  
Service channel 'joke-service' is now bridged to a REST endpoint /rest/joke (GET)  
Service '*services.JokeService' initialized successfully. 
{{< /highlight >}}


We can call our service **_right away_** without creating an Async client to run pub-sub because of our **REST Bridge** that we configured. 



{{< highlight zsh >}}
curl http://localhost:30080/rest/joke
{{< /highlight >}}


Will print something like: 


{{< highlight json >}}
{
    "id": "HJJY0LR7hyd",
    "joke": "Where did you learn to make ice cream? Sunday school.",
    "status": 200
}
{{< /highlight >}}



Pretty neat!

---

## 6. Create a client to call the service asynchronously

Let's go deeper and create a client to connect to our local instance of Plank and query our service using Pub-Sub.

Create a new file named '[client.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/pub-sub/client.go)'

{{< highlight go >}}
package main

import (
	"encoding/json"
	"fmt"
	"sync"
	"github.com/vmware/transport-go/bridge"
	"github.com/vmware/transport-go/bus"
	"github.com/vmware/transport-go/model"
	"github.com/vmware/transport-go/plank/services"
	"github.com/vmware/transport-go/plank/utils"
)

func main() {
{{< /highlight >}}

{{< code-split >}}First, we create a broker connector configuration that connects to the local instance of Plank, now running on port 30080.{{< /code-split>}}

{{< highlight go >}}
    // create a message broker connector config and connect to
    // localhost over WebSocket on port 30080.
    config := &bridge.BrokerConnectorConfig{
        Username:   "guest",           // not required for demo, but our API requires it.
        Password:   "guest",           // ^^ same.
        ServerAddr: "localhost:30080", // our local plank instance, running RandomWordService
        UseWS:      true,              // connect over websockets
        WebSocketConfig: &bridge.WebSocketConfig{ // configure websocket
            WSPath: "/ws", // websocket endpoint
            UseTLS: false, // disable TLS for local demo
        }}
{{< /highlight >}}

{{< code-split >}}Next, we get a reference to Transport and its channel manager.{{< /code-split >}}

{{< highlight go >}}
    // get a pointer to transport
    b := bus.GetBus()

    // get a pointer to transport's channel manager
    cm := b.GetChannelManager()
{{< /highlight >}}

{{< code-split >}}Using the bus, we connect to our local instance of Plank and create a local channel on our application bus that we then bridge to our Joke Service subscription destination.{{< /code-split >}}

{{< highlight go >}}
    // connect to localhost:30080
    c, err := b.ConnectBroker(config)
    if err != nil {
        utils.Log.Fatalf("unable to connect to %s, error: %v", config.ServerAddr, err.Error())
    }
    
    // create local channels for pub-sub comms that are bridged to our joke-service channel.
    jokeSubChan := "jokes"
    cm.CreateChannel(jokeSubChan)

    // create a handler that will listen for a single response and then unsubscribe.
    jokeSubHandler, _ := b.ListenOnce(jokeSubChan)

    // mark our local 'jokes' channel as 'galactic' and map it to our connection and
    // the destinations defined by the AsyncAPI contract
    cm.MarkChannelAsGalactic(jokeSubChan, "/queue/joke-service", c)
{{< /highlight >}}

{{< code-split >}}We don't want the application to exit before our response has come in, so we can use a `WaitGroup`.{{< /code-split >}}

{{< highlight go >}}
    // create a wait group so our client stays running whilst we wait for a response.
    var wg sync.WaitGroup
    wg.Add(1)
{{< /highlight >}}

{{< code-split >}}Next, we add success and error functions to our stream handler; to deal with our incoming Joke response. {{< /code-split >}}

{{< highlight go >}}
    // Start listening for our joke response.
    jokeSubHandler.Handle(
        func(msg *model.Message) {
{{< /highlight >}}

{{< code-split >}}We can use the helper method `CastPayloadToType` to convert our message payload into a `Joke` type.{{< /code-split >}}

{{< highlight go >}}
            // extract our Joke response
            var joke services.Joke
            if err := msg.CastPayloadToType(&joke); err != nil {
                fmt.Printf("failed to cast payload: %s\n", err.Error())
            } else {
{{< /highlight >}}

{{< code-split >}}We will log out the Joke property of our response to the console and then inform the `WaitGroup` that we're done.{{< /code-split >}}

{{< highlight go >}}
                // log out our joke to the console.
                utils.Log.Info(joke.Joke)
            }
            wg.Done()
        },
        func(err error) {
            utils.Log.Errorf("error received on channel: %e", err)
            wg.Done()
        })
{{< /highlight >}}

Now our 'Sub' code is done, we can write the 'Pub' code.

Let's create a `model.Request` and set the '**_Request_**' property to be the `get-joke` operationId or '_command_' our Joke Service is looking for. 

{{< highlight go >}}
    // create a joke request.
    req := &model.Request{Request: "get-joke"}
    reqBytes, _ := json.Marshal(req)  
{{< /highlight >}}

{{< code-split >}}Using our connection, we fire our `model.Request` object off to our publish destination '**/pub/queue/joke-service**'.{{< /code-split >}}

{{< highlight go >}}
    // publish joke request
    c.SendJSONMessage("/pub/queue/joke-service", reqBytes)

    // wait for joke response to come in and be printed to the console.
    wg.Wait()
{{< /highlight >}}

{{< code-split >}}Once published, our WaitGroup will block the application from completing until our Joke response comes back in.{{< /code-split >}}

{{< highlight go >}}
    // wait for joke response to come in and be printed to the console.
    wg.Wait()

    // mark channels as local (unsubscribe)
    cm.MarkChannelAsLocal(jokeSubChan)

    // disconnect from our broker.
    c.Disconnect()
}
{{< /highlight >}}


---

## 7. Run the client and enjoy a terrible joke

Now you can run the client application. Pop open a new console and run:

{{< highlight zsh >}}
go run client.go
{{< /highlight >}}


{{< info-box >}}
Make sure the server is still running before you connect your client. 
{{< /info-box >}}


{{< inline-figure "*client-output*" "What a terrible joke." "Image of a console window, showing the output of our terrible joke client after talking to our terrible joke service.." >}}

And that's it; you're up and running with your own AsyncAPI nano-platform!


All the code from this tutorial [can be found on GitHub](https://github.com/daveshanley/asyncapi-tutorials/tree/main/pub-sub)

- [Pub-SubAsyncAPI Specification](https://github.com/daveshanley/asyncapi-tutorials/blob/main/specs/pub-sub.yaml)
- [client.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/pub-sub/client.go)
- [server.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/pub-sub/server/server.go)
- [word_service.go](https://github.com/daveshanley/asyncapi-tutorials/blob/main/pub-sub/services/word_service.go)

Head over to [transport-bus.io](https://transport-bus.io) if you would like to learn more about Transport as a tool for building full stack asynchronous applications.




 