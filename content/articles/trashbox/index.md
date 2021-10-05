---
title: "TrashBox, Engineering a solution to memory loss."
description: "Two problems plague my life, misplacing my phone and forgetting to take out the trash. I solved both issues with one black box."
date: 2021-09-30T15:23:07-04:00
draft: false
menu: "articles"
strapline: "It's 7 am on Wednesday, and I am once again running down the driveway in my underwear."
hero: "images/hero-images/trashbox.png"
heroSVG: "images/hero-images/trashbox.png"
heroTitle: "'Did you remember the Trash?'... oh no, not again."
heroAlt: "UX, UI, and DX are all a part of experience engineering."
---

"**_Dammit, why am I unable to get this under control!_**" I thought to myself as I ran, dragging two weeks worth of hot, stinking garbage toward the collection truck that was just about to drive past my house **again**.

It's late August in Virginia in 2017, which _isn't great_ for storing garbage outside your house. My wife is newly pregnant and understandably losing her patience with me.

Hot and annoyed at myself, I reach for my pocket _(and remember I'm still in my underpants)_, **suddenly it dawns on me**:

## "Have you seen my phone?"

"**No**, **_stop asking me!_ Use your beeper app**," said my wife. 

But the beeper app _didn't work anymore_.

I was running around the house for ten minutes, up and downstairs, no dice. I finally cave in and use 'Find My Phone' via the iCloud portal.

My phone was **_under the mower_**, **in the shed**. 

"I **_need_** to solve these problems, once and for all," I thought to myself. "I need **_something_**, that **won't let me forget** to take out the trash **_AND_** will **find my phone**."

---
{{< inline-figure "*take-out-the-trash*" "The sense of urgency was high." "image of an LCD screen with the words 'Take out the fucking trash' written on it" >}}


## The result: TrashBox

[See trashbox in youtube](https://www.youtube.com/watch?v=3EVCan-ZwcU) in all of its **_poorly woodworked_** glory.

{{< youtube "3EVCan-ZwcU" >}}

--- 

{{< image-grid >}}
    {{< image-grid-item "*front-view*" "Online, sitting underneath our TV" "Trashbox lit up and sitting on a speaker in a living-room" >}}
    {{< image-grid-item "*top-view*" "What it looks like from the top" "A top-down view of trashbox, a red and green button can be seen with an LCD screen" >}}
    {{< image-grid-item "*inside-view*" "A peek inside" "Trashbox with a lifted up lid, looking inside. Red wires connect all the components" >}}
{{< /image-grid >}}

---

## Starting at the beginning with 'gobeepme.'

During the Christmas period of 2015, The urge to learn [golang](https://golang.org/) became strong. After reading '[The Go Programming Language](https://www.amazon.com/gp/product/0134190440/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0134190440&linkCode=as2&tag=quobix-20&linkId=6f40b3b70f740c4dda8cd33b021b0320)', I wanted to build something to help cement my newly acquired knowledge. 

I wanted to [build an experience]({{< ref "articles/experience-engineering" >}}) that was missing from the market; I wanted to trigger the real 'Find My Phone' feature built into iPhones via one of the Alexa nodes laying around my home. 

I wanted to say "**Alexa**, **_where is Dave's Phone_**?" and through the magic of technology, my phone would beep. 

I would then be able to hunt it down.

### A quick Q&A to help set some context 

**Why not just call your phone**?
: My phone is **_always on silent_**. _Always_.

**Why not use an existing app**?
: None of them use 'Find my Phone'; they call your phone. 

**Set a calendar reminder, set like - ten of them**?
: My phone is set to do-not-disturb at times I would need to remember; I ignore the constant buzzing.

**Why not just use an existing library**?
: At the time, there wasn't one. There still isn't one.

**Why are there so few options for libraries that do this**?
: The API is undocumented. Apple have [not made it available]({{<ref "disclaimer" >}}) to developers. It is public, however.

### Reverse engineering the 'Find My iPhone' API

A combination of [Wireshark](https://www.wireshark.org/), [Charles Proxy](https://www.charlesproxy.com/), and [Chrome Developer Tools](https://developer.chrome.com/docs/devtools/open/) made it pretty simple to determine what was going on with 'Find My iPhone' under the covers.

{{< card "My new (first ever) go app 'gobeepme'" >}}
With the hard part (figuring out what APIs to call) complete,  I wrote [gobeepme](https://github.com/daveshanley/gobeepme).

It's a [multi-interface]({{< ref "articles/experience-engineering#the-art-of-interfaces" >}}) application. It runs as a **CLI**, interactively or via automation. It also runs as a RESTful API as a headless service. It comes with a web UI as well (if you choose to build it).

Try it out right now (as long as you have [go installed](https://golang.org/dl/)). Open your terminal and run:

{{< highlight zsh >}}
$ git clone https://github.com/daveshanley/gobeepme.git
{{< /highlight >}}

Once cloned, build and run [gobeepme](https://github.com/daveshanley/gobeepme).

{{< highlight zsh >}}
$ go build gobeepme.go
$ ./gobeepme
{{< /highlight >}}

There are more details available in the [README](https://github.com/daveshanley/gobeepme/blob/master/README.md).

{{< warn-box >}}
As I mentioned, this was my first go app. Please excuse the construction of the code.
{{< /warn-box >}}
{{< /card >}}

My wife and I used [gobeepme](https://github.com/daveshanley/gobeepme) regularly for a couple of years. My wife used it as much as I did with her phone until I forgot to renew SSL certs. 

After our Alexa nodes stopped responding one day, I figured out that the SSL certs I was using had expired. We had a one-year-old taking up all our time, and my beeper code was a distant memory.

## Back to the physical plane of interactivity

My new 'trash' problem and recently re-emerged 'lost phone' problem was now causing me constant, avoidable grief. I wanted to solve both problems with a single solution.

### The experience requirements

1. Must **annoy me** until forced into being reminded to take out the trash.
2. Must **annoy my wife**, so she kicks my ass into taking out the trash.
3. It will have a **_smaller button_** to allow us to select my phone or my wife's phone.
4. Must have a **screen** to show which phone is currently selected.
5. Will have another **_ more prominent button_** that will call the gobeepme service with the selected phone.
6. Will have **_ tiny control button_** at the back to toggle different modes.
7. Makes **fun noises** for button feedback.
8. It makes a **terrible noise** when it's trash time.
9. Must look like a [prop from a cheap sci-fi show](https://reddwarf.fandom.com/wiki/Holly_Hop_Drive)[^1].
10. Must still (somehow) **_blend in with our home decoration_**.

## Making it annoying

What is _more_ annoying than super bright flashing red LEDs in your face? 

{{< inline-figure "*trashbox-loop*" "Is it annoying enough yet?" "animation of trash box lights, lighting up and flashing 'trash'" >}}

The familiar Original Star Trek [whooping siren](https://github.com/daveshanley/trashbox/blob/master/sfx/alert.wav) plays, and the front of the trashbox lights up and blinks, endlessly, on **Tuesday night** at **_9 pm_**.

The only way to turn it off is to _press the red control button_ at the back of the box.[^2] 

It means we **physically have to get up and move** to disable this most irritating device.

---

## Grabbing all the electronics to make it work

I grabbed a [Massive Arcade Button](https://www.adafruit.com/product/1185), [Red push button](https://www.adafruit.com/product/1439) and a [Green arcade button](https://www.adafruit.com/product/1193) for the controls. 

I headed over to [Phidgets](https://www.phidgets.com/?view=engineers) to grab a [Single Board Computer](https://www.phidgets.com/?tier=1&catid=1&pcid=0), [VINT Hub](https://www.phidgets.com/?tier=3&catid=2&pcid=1&prodid=643), two [LED Controllers](https://www.phidgets.com/?tier=3&catid=99&pcid=79&prodid=964) and an [LCD Sceen](https://www.phidgets.com/?tier=3&catid=100&pcid=80&prodid=1030) for all the controllers.

I used Home Depot for the wood for the actual box, and I already had the tools.

Construction was messy. I also had **_no real experience_** (at the time) making anything with wood and nails, so the actual wooden box is **pretty shoddy**. 

{{< image-grid >}}
    {{< image-grid-item "*wires*" "Creating the LED wiring" "Red and black wires and LED lights" >}}
    {{< image-grid-item "*soldering*" "Soldering wires, connectors and controllers" "Soldering the components together, wires and controls" >}}
    {{< image-grid-item "*led-wiring*" "Putting LEDs into the case" "LEDs inserted into a black wooden box" >}}
    {{< image-grid-item "*building-lid*" "Building the box lid" "Control buttons on a table, plank of wood with holes cut out in it" >}}
    {{< image-grid-item "*control-button*" "The control button" "Red lit up circular button" >}}
{{< /image-grid >}}

## The code

[Phidgets](https://www.phidgets.com/docs/Phidgets_Drivers) has some great official drivers. There is no official support for golang[^3], however. 

The lack of golang support wasn't going to be an issue, [Java support](https://www.phidgets.com/docs/Language_-_Java) is solid. 

{{< info-box >}}
It just so happens that I **_also_** had another problem to solve, **requiring Java**
{{< /info-box >}}

### Transport needs a Java Version

[Transport](https://transport-bus.io) is an open-source, multi-language application event bus and micro-platform technology used in multiple VMware products. In both front-end and back-end systems. 

At the time I was building trashbox, Transport only existed as [TypeScript](https://transport-bus.io/ts). We needed a Java version so that [Spring](https://spring.io/) applications could talk to UIs easily.

Trashbox was an **_opportunity_**.

> "_If I can prove that the bus design works on a single board computer controlling LCDs and LEDs, then I know it can power anything."

{{< card "Trashbox runs Transport" >}}

I added in some existing prototype code (that is now [opensource](https://github.com/vmware/transport-java)) to a new project that would allow me to use the bus to carry commands from button events and LED events.

Running the code on the microcontroller helped me understand how **to improve the performance of the bus**. The single-threaded CPU **_ slows things down_**.

The same code running Trashbox also powers the [vSphere Client](https://www.vmware.com/products/vsphere.html) and [VMware Cloud Console](https://vmc.vmware.com/) and others.

{{< /card >}}

{{< default-box >}}
The final (and useless outside trashbox) [code is here](https://github.com/daveshanley/trashbox).
{{< /default-box >}}

### Watch a quick video of what Transport is.

{{< youtube "k-KDPtCQyls" >}}

## The end of the story

Trashbox went **_out of service_** in **2020** after a few things happened: 

- My wife kept unplugging it, and I would **_not notice_** until I **missed** the trash repeatedly.
- We moved, and our new home has **_no-where_** for it to go, without it looking **awful**.
- Trash pickup occurs at the end of the day now; there is _no morning rush_.

{{< warn-box >}}
Trashbox also did its job. We now both remember the trash, **we don't need it**.
{{< /warn-box >}}

### What about the 'Find My Phone feature? Don't you still use that?

No, Apple released the 'Find My' app on macOS X. I have this open all the time on my machine(s). It's easy to open and ping a phone or AirTag quickly. 

---
{{< info-box >}}
We no longer need Trashbox, but I **hope** this story **_inspires you_** to build your own '_single experience for a multi-headed problem_' box someday.
{{< /info-box >}}

[^1]: [The holly hop drive](https://reddwarf.fandom.com/wiki/Holly_Hop_Drive?file=Holly-Hop-Drive.jpg) was supposed to be a faster than light, instant transport device. It was so simple it only had two buttons on it, stop and go. It did not work; it was a dimensional drive.
[^2]: You can also rip the power cable out of the wall, which is my wife's preferred method.
[^3]: I did find this attractive golang opensource binding for the C library called [gophidgets](https://github.com/jrcichra/gophidgets); however, this was not available in 2017.
