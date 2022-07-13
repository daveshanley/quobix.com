---
title: "How to build a React based pub-sub client using WebSockets and JavaScript"
date: 2022-01-24T09:14:17-05:00
draft: false
menu: "articles"
description: "Learn how easy it is to call Asynchronous APIs using pub-sub, WebSockets and STOMP, inside a React UI application, we're going to build in JavaScript."
strapline: "Build a simple stock ticker UI using React, calling a pub-sub API."
hero: "images/hero-images/react-stock-ticker.png"
heroSVG: "images/hero-images/react-stock-ticker.svg"
heroTitle: "Asynchronous APIs and event driven design are part of the future of applications."
heroAlt: "Build a React pub-sub stock ticker using STOMP and WebSockets"
---

## Watch the video 
{{< youtube "JkxsTLZIofY" >}}

---

This is quick tutorial to help you understand the basic mechanics of how **Pub-Sub** works and how you can call an asynchronous API from a browser using JavaScript, [STOMP](https://stomp.github.io/), and [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). We're going to build a simple

If you're not familiar with [STOMP](https://stomp.github.io/), it stands for (**_S_**)imple (**_T_**)ext (**_O_**)riented (**_M_**)essaging (**_P_**)rotocol. It's a straightforward but stable protocol that makes interacting with a message or event-based APIs a breeze.

---

{{< card "You won't have to learn STOMP" >}}
We will use a library encapsulating the protocol. We're going to use [Transport](https://transport-bus.io/) for this tutorial. It's an asynchronous API framework implemented in multiple languages that supports [STOMP](https://stomp.github.io/) out of the box.
{{< /card >}}

Our application is going to be a simple stock ticker. We will type in a stock symbol and request it from a **StockTicker** Service running for real over at [transport-bus.io](https://transport-bus.io/) via WebSocket. 

The service will respond with details about the latest closing price for that stock symbol, and our UI will render it out.

---

## 1. Create our new react application using create-react-app

Let's keep it simple and create a new react application using `npx create-react-app stock-ticker`

Change directory into the '**stock-ticker**' directory, and now you can install [Transport (JavaScript)](https://github.com/vmware/transport-typescript).

Transport only has one significant dependency, RxJS, so let's install it via `yarn add rxjs`

Now install Transport using `yarn add @vmw/transport`.


{{< info-box >}}
To stop any TypeScript warnings, add Typescript (but it's not required) `yarn add typescript`
{{< /info-box >}}

---

## 2. Create a custom hook to access event bus, and boot it.

Create a new file named '**transport.js**'. Here we will create a custom hook called `useTransport`. It's a simple way for components to access the singleton event bus.

{{< highlight javascript >}}
import { BusUtil } from "@vmw/transport/util/bus.util"

export function useTransport() {
    return BusUtil.getBusInstance();
}
{{< /highlight >}}

Next, we import `BusUtil` and `LogLevel` from Transport into our "**index.js**" file. We will use them to boot the event bus properly and set the logging level correctly. 

{{< highlight javascript >}}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BusUtil } from "@vmw/transport/util/bus.util"
import { LogLevel } from "@vmw/transport/log/logger.model"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// boot bus and set logging levels.
const bus = BusUtil.bootBus();
bus.api.setLogLevel(LogLevel.Verbose);
bus.log.useDarkTheme(true); // disable if you're not using dark mode in your browser.
{{< /highlight >}}

---

## 3. Connect to message broker in App.js

"**create-react-app**" will generate some example code here that we don't need, so let's clear out the generated markup.

Let's import `useState` and `useEffect` hooks from react, and let's use our custom hook `useTransport` to get a reference to our event bus.

{{< highlight javascript>}}
import { useState, useEffect } from "react"
import { StockTicker } from "./StockTicker";
import { useTransport } from "./transport";
import './App.css';

function App() {
  const bus = useTransport();
{{< /highlight >}}

{{< code-split >}}We want to track if we're connected, so let's create a new state variable called `connected` and set it to `false`.{{< /code-split >}}
{{< highlight javascript>}}
  const [connected, setConnected] = useState(false);
{{< /highlight >}}

{{< code-split >}}Next, we hook into the component lifecycle with `useEffect`.  Let's use `bus.fabric.connect` and provide two closures.{{< /code-split >}}
{{< highlight javascript >}}
  // connect to broker if we're not connected
  useEffect(
    () => {
      if (!connected) {
        bus.fabric.connect(
          () => {
            // handle success
            console.log("application has connected to the broker");
            setConnected(true);
          },
          () => {
            // handle failure
            console.log("application has disconnected from the broker");
            setConnected(false);
          },
          "transport-bus.io",
          443,
          "/ws",
          true,
          "/topic",
          "/queue"
        );
      }
    }
  );
{{< /highlight >}}
{{< code-split >}}Now we can put in a new page title and then get cracking on our `StockTicker` component. {{< /code-split >}}
{{< highlight jsx >}}
  return (
    <div className="App">
        <h1>Stock Lookup</h1>
        <StockTicker />
    </div>
  );
}

export default App;
{{< /highlight >}}

---

## 4. Create StockTicker component

Create a new file named "**StockTicker.js**" and then import what we need:
{{< highlight javascript>}}
import { useState, useEffect } from "react";
import { useTransport } from "./transport";
import { GeneralUtil } from "@vmw/transport/util/util";
{{< /highlight >}}
{{< code-split >}}Now we can create our `StockTicker` component.{{< /code-split >}}

{{< highlight javascript>}}
// stock ticker component
export function StockTicker() {
{{< /highlight>}}

{{< code-split >}}Let's define the state we're going to need for this component.{{< /code-split >}}
{{< highlight javascript>}}
    // define hooks
    const [stockLookup, setStockLookup] = useState("GOOG");
    const [closePrice, setClosePrice] = useState(null);
    const [lastRefreshed, setLastRefreshed] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [stockError, setStockError] = useState(null);
    const [subscribed, setSubscribed] = useState(false);
{{< /highlight >}}



{{< code-split >}} Next, we get a reference to our bus, define the channel we're subscribing to and then generate a connection string.{{< /code-split >}}
{{< highlight javascript>}}
    // grab a reference to our event bus
    const bus = useTransport();
    
    // define the channel our stock service is operating on.
    const stockChannel = "stock-ticker-service";

    // create a connection string to identify our broker
    const connectionString = GeneralUtil.getFabricConnectionString(
        "transport-bus.io",
        443,
        "/ws"
    );
{{< /highlight >}}


--- 

### 4.1 Implement useEffect and subscribe to the stock ticker channel


Implement `useEffect` and subscribe to our broker destination.

{{< highlight javascript>}}
    // if we are subscribed, then we do nothing, if not... we subscribe!
    useEffect(
        () => {
            if (!subscribed) {
                // subscribe to service by marking the channel as galactic.
{{< /highlight >}}
{{< code-split >}}If we haven't yet subscribed, we use the [markChannelAsGalactic](https://transport-bus.io/ts/extending-channels) method, and it automatically subscribes the client to that destination on the broker. We're marking this channel as [private](https://transport-bus.io/java/private-channels), which means it will use a queue and be a one-to-one conversation.{{< /code-split >}}

{{< highlight javascript>}}
                bus.markChannelAsGalactic(stockChannel, connectionString, true);
                setSubscribed(true);
            }
{{< /highlight >}}

{{< code-split >}}Then, we can return a function that will use the [markChannelAsLocal](https://transport-bus.io/ts/extending-channels) method to un-subscribe from the destination when the component is unmounted.{{< /code-split >}}
{{< highlight javascript>}}
            return () => {
                // all done, unsubscribe
                bus.markChannelAsLocal(stockChannel);
            };
        }, [subscribed, bus, connectionString]
    );
{{< /highlight >}}

### 4.2 Implement handleSymbolChange function

Next, let's implement the `handleSymbolChange` function that will fire when the component form input changes. We set the `stockLookup` state using our event's `target.value` property.

{{< highlight javascript>}}
    function handleSymbolChange(e) {
        setStockLookup(e.target.value);
    }
{{< /highlight >}}


### 4.3 Implement requestStock function

{{< card "Check out the AsyncAPI Contract">}}

If we look at the [AsyncAPI contract](https://studio.asyncapi.com/?load=https://raw.githubusercontent.com/vmware/transport-go/main/plank/specs/asyncapi/plank-sample-services-asyncapi.yaml) for this service and look at the [publish command](https://studio.asyncapi.com/?load=https://raw.githubusercontent.com/vmware/transport-go/main/plank/specs/asyncapi/plank-sample-services-asyncapi.yaml#operation-publish-pub/queue/stock-ticker-service) and have a look at the example, we can see that the payload of our message is an object that contains a single property named `symbol`.

We should note that the **operation ID** is `ticker_price_update_stream`. Operation IDs are what Transport calls **_commands_**. 
{{< /card >}}

Let's create a new request via the `generateFabricRequest` method. 

{{< highlight javascript>}}
 function requestStock() {
        let request = bus.fabric.generateFabricRequest(
            "ticker_price_update_stream",
            { symbol: stockLookup }
        );
{{< /highlight >}}


{{< code-split >}}
Now we can define the logic that will send our request over the bus to our stock ticker service that is listening at [transport-bus.io](https://transport-bus.io) on channel "**stock-ticker-service**".
{{< /code-split >}}
{{< highlight ts>}}
        // make the request over the bus and over to our broker at transport-bus.io
        bus.requestOnce(stockChannel, request).handle(
            (response) => {
                // success
                if (response.payload) {
                    setClosePrice(response.payload.closePrice);
                    setLastRefreshed(response.payload.lastRefreshed);
                    setSymbol(response.payload.symbol);
                } else {
                    setStockError("nothing returned by service");
                }
            },
            (error) => {
                // error
                setStockError(error.errorMessage);
            }
        );
{{< /highlight >}}

---

### 4.4 Return StockTicker JSX


{{< highlight jsx>}}
    // return our component JSX
    return (
        <div>
            <label>Ticker Symbol: </label>
            <input type="text" value={stockLookup} onChange={handleSymbolChange} />
            <button onClick={requestStock}>Get Price!</button>

            <StockError errorMessage={stockError} />
            <StockResult
                closePrice={closePrice}
                symbol={symbol}
                lastRefreshed={lastRefreshed}
            />
        </div>
    );
{{< /highlight >}}

---

## 5. Create StockResult and StockError Components


The `StockError` component only renders if the props contain an `errorMessage` property.

{{< highlight jsx>}}
function StockError(props) {
    if (props.errorMessage) {
        return (
            <div>
                <hr />
                <h3>Sorry! the service issued an error</h3>
                <p> {props.errorMessage} </p>
            </div>
        );
    }
    return null;
}
{{< /highlight >}}

Lastly, we define our `StockResult` component. Let's limit the price value to two decimal points to make it simpler to read. Then we can also extract the `lastRefreshed` and `symbol` properties. 


{{< highlight jsx>}}
function StockResult(props) {
    let price = props.closePrice?.toFixed(2);
    let lastRefreshed = props.lastRefreshed;
    let symbol = props.symbol;

    if (price && lastRefreshed && symbol) {
        return (
            <div>
                <hr/>
                Symbol: <strong>{symbol}</strong>
                <br/>
                Price: <strong>{price}</strong>
                <br/>
                Last Refreshed: <strong>{lastRefreshed}</strong>
            </div>
        );
    }
    return null;
}
{{< /highlight >}}

---

## 6. Run the application!


Let's run our application. In our terminal window, use `npm start` and our application should appear.

{{< inline-figure "*stock-ticker-ui*" "It looks crap yes, but it's the mechanics we care about in this tutorial" "Image of our Stock Ticker UI application running in a browser, showing a form input saying 'GOOG' and a button saying 'Get Price'." >}}


---

## 7. Take a look at the code. 

You can find all the [code in this tutorial on GitHub](https://github.com/daveshanley/asyncapi-tutorials/tree/main/stock-ticker)

1. [App.js](https://github.com/daveshanley/asyncapi-tutorials/blob/main/stock-ticker/src/App.js)
2. [StockTicker.js](https://github.com/daveshanley/asyncapi-tutorials/blob/main/stock-ticker/src/StockTicker.js)
3. [transport.js](https://github.com/daveshanley/asyncapi-tutorials/blob/main/stock-ticker/src/transport.js)
4. [index.js](https://github.com/daveshanley/asyncapi-tutorials/blob/main/stock-ticker/src/index.js)

Also, you can [Try out the stock ticker online](https://transport-bus.io/ts/examples/stock-ticker).




