---
title: "M.A.R.V.I.N"
description: "Before VXRail, there was EVO:RAIL. Before both, however, there was MARVIN. Fifteen minutes from power on to first VM."
date: 2021-11-09T09:17:42-04:00
draft: false
menu: "articles"
strapline: "Before VXRail, there was EVO:RAIL. Before both, however, there was MARVIN."
hero: "images/hero-images/marvin-hero.png"
heroSVG: "images/hero-images/marvin-hero-transparent.png"
heroTitle: "[**_M_**]odular [**_A_**]utomated [**_R_**]ackable [**_V_**]irtual [**_I_**]nfrastructure [**_N_**]ode"
heroAlt: "Image of MARVIN. Modular Automated Rackable Virtual Infrastructure Node."
---

It was February 2013, and I had just moved to San Francisco. I had been working for VMware for around eight months. 

I was excited to be working (finally) in Silicon Valley; A dream of mine since childhood.

One wintery afternoon, [Mornay Van Der Walt](https://www.linkedin.com/in/mornay-van-der-walt) Called me into his office. He asked me

> "Do you think we could build a prototype that installs and configures an entire SDDC in a hyper-converged infrastructure appliance format and do it in 
> **_under 15 Minutes_**"?

I thought for a minute. "_Sounds kinda hard_" I said to myself.

> "Yeah. sure, I mean, how hard could it be?" 

I had no idea.

---

## What should we call it?

This prototype needed to perform a **massive** amount of automation and be simple enough to use without training. 

Knowing where to start when faced with a blank sheet of paper is always the most challenging part. I believe in [Experience First]({{< ref "articles/experience-engineering" >}}) as
an engineering principal. 

**User Experience comes first**.

I always start with drawing out ideas on a whiteboard, so as I was scribbling out some nonsense a few days later, and [Adam Zimman](https://twitter.com/azimman) walked past me and said something
along the lines of:

> "Oh, you're working on Mornay's Project? Cool, what about naming it MARVIN?"

Without me asking, he reeled off the acronym meaning:

> "Modular Automated Rackable Virtual Infrastructure Node"

Adam then proceeded with the idea of using [Marvin the Paranoid Android](https://en.wikipedia.org/wiki/Marvin_the_Paranoid_Android) from [The Hitchhiker's Guide to the Galaxy](https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy), as a mascot for the prototype.

No debate ensued. I **loved** the idea. 

---

## The Prototype

After months of prototyping, I had developed the basics of an end-to-end experience. It showcased the **_configuration_** and **_build_** experience of the appliance. 

The prototype was _also functional_. I spent a **massive** amount of time picking the brains of [William Lam](https://twitter.com/lamw) over which ESX and vCenter APIs I needed to use, what sequences we required and what data we needed to capture. 

The [original workflow](/assets/pdfs/marvin-workflow.pdf) resulted from **_significant_** amounts of William's time, effort, and help.

{{< inline-figure "*marvin-homepage*" "Images like these remind me that I should leave design, to designers." "Image of the original prototype showing MARVIN the paranoid android" >}}

---

{{< info-box >}}
The following video is the original prototype of MARVIN. It showcased the possibilities of what could be. I also want to remind you that it was 2013, **_many years ago_**. Combined with the fact that I am **not** great at design.
{{< /info-box >}}

{{< youtube "0LSVL_9QZZc" >}}

View the [original wireframes](/assets/pdfs/marvin-wireframe.pdf), [flow chart](/assets/pdfs/marvin-flowchart.pdf) and [basic block diagram](/assets/pdfs/marvin-architecture.pdf).

---

## The First Hires

Things moved **fast** after the initial showcase of the prototype. Mornay informed me that we could hire engineers. The first hire had to be a UI engineer that was **_way_** smarter than me.

Within a few days, I met [Jehad Affoneh](https://twitter.com/jaffoneh) for the first time. 

After **ten** seconds of talking to him, **_I wanted him to join the team_**. [Jehad](https://twitter.com/jaffoneh) was a design and experience thought leader masquerading as an engineer. He could see what I could see before I could even explain it.

I knew we also needed another engineer to lead the **platform** engineering. Once again, it had to be someone **_way_** smarter than me.

[Wit Riewrangboonya](https://twitter.com/witriew) stepped into the light. 

One of the most intensely passionate and talented engineers I've ever met, wickedly intelligent and unafraid to show it. [Wit](https://twitter.com/witriew) was working on [ESXi](https://www.vmware.com/products/esxi-and-esx.html) at the time and, like Jehad, was looking for a new challenge.


---

## A Silicon Valley Startup

We didn't have an office to work in, so we camped out in a meeting room in Promontory D, located on the VMware Palo Alto Campus.

{{< inline-figure "*warroom*" "Pizza, Beer, Whiskey, Late Nights - Good times" "Image of the early MARVIN engineering team" >}}

We hacked code like crazy. There was **excitement** in the air; we were onto something **new**, something **_hot_**.

---

{{< inline-figure "*fun*" "We managed to win tens of thousands of tickets at Dave & Busters one night" "Image of the early MARVIN engineering team" >}}

---

We moved from meeting room to meeting room for a few months, until one day in early 2014, we got our place on the Palo Alto campus. The back corner of one of the newly constructed Hilltop buildings.

Shortly after moving into our new office, we got our hands on **_real_** hardware to test our code actually worked.

We set up a dedicated testing room next to our dev office and installed a **big clock** on the wall. We used this to time our automation runs on real hardware. 
 
We had **_15 minutes_** to get that first VM up and running.

{{< image-grid >}}
    {{< image-grid-item "*hardware-front*" "Pretty front-end" "front of a hyper-converged infrastructure appliance" >}}
    {{< image-grid-item "*hardware-back*" "Not so pretty back-end" "back of a hyper converged infrastructure appliance" >}}
    {{< image-grid-item "*test-room*" "The clock was always on" "Trashbox with a lifted up lid, looking inside. Red wires connect all the components" >}}
{{< /image-grid >}}

It was a **stressful** time, but the excitement came in from **_all corners_** of the company. When we showcased the experience, everyone (_I think_) was impressed. 

The wow factor was that anyone who had experience with installing and configuring a cluster before, knowing the steps involved and the complexity it presented the administrator - MARVIN was **seemingly 
magic**.

---

{{< card "The Pitch to Pat" >}}
After months of late nights, hardware quirks, and software issues up and down the entire VMware stack, we finally did it. We were ready to show (then VMware CEO) [Pat Gelsinger](https://twitter.com/PGelsinger)
what we could do after spending a decent slice of our R&D budget. 

We started the clock and ran the entire sequence. 

Fourteen minutes later, we had our first VM up and running from a 'factory fresh' state. It ran like **_clockwork_**, mainly because we had clocked thousands of hours of runs
on our hardware over the previous months.

{{< tweet 474601531140886529 daveshanley >}}

{{< /card >}}

---

## Ready to show customers

The showcase went well, and we had the **green light** to continue and accelerate.

Over the next couple of months, the team worked **_super hard_** to fix bugs and tighten the entire product up. MARVIN 1.0 GA (General Availability) had been born.

{{< inline-figure "*celebrate*" "Wit has a strong passion for software architecture and champagne." "Picture of Wit holding champagne with a large grin on his face" >}}

---

{{< error-box >}}

Except, there was a _fly in the ointment_. "MARVIN" was **not** a name VMware marketing was interested in.

{{< /error-box >}}

--- 

## It needs another name

We tried, but it was a **hard no**. 'MARVIN' as a product name was out. The marketing team was working on a concept called '_EVO_' as the new term for a family of evolutionary solutions from VMware.

Various terms and ideas got thrown around; none of them sounded right or felt accurate. We were **running out of time**, and everything on the table wasn't working. 

One afternoon the name '**_RAIL_**' popped up. 

It described **exactly** what you did with the hardware; you _rolled_ it into a server rack via a **_rail_**.

So, **EVO:RAIL** was the new name. It made sense, and it sounded _cool_. 

Time to announce it at [VMworld](http://www.vmworld.com).

---

## The shiny new thing

EVO:RAIL was _relatively_ high profile at VMworld 2014. It made the keynote announcement; it had a **_prime and prominent_** position on the expo floor.

{{< tweet 504400500914417664 daveshanley >}}
{{< tweet 504782125321580544 eloyont >}}

{{< youtube "cu-2mVVOpCI" >}}

{{< youtube "nctI7yAnI_E" >}}

{{< youtube "OkrC-wn-7EI" >}}


{{< info-box >}}
Even though we changed the name, we kept our MARVIN robot mascot; it's all over the UI and the videos.
{{< /info-box >}}

---

## The road to 2.0

After the initial buzz of VMworld, we got to work on wrapping up our first release (and some patches), and then we turned our attention to our next major 2.0 release.

We **_grew the team significantly_** across engineering, product management, business development (sales), QA, and operations. New partnerships and agreements are announced frequently on emails and all-hands.

As we rolled through early 2015, we held offsite workshops to build ideas across the engineering and product management teams.

{{< image-grid >}}
    {{< image-grid-item "*workshop1*" "Who needs corporate slides?" "Image of a man giving a presentation, with an image of the joker dressed as ronald macdonald" >}}
    {{< image-grid-item "*workshop2*" "Documentation management is complex" "Image of a man pointing at a presentation of an architecture" >}}
    {{< image-grid-item "*workshop3*" "Teams 'Wehad' and 'Jit' presented" "Image from the movie 300 with 'Challenges of Scale' written on it" >}}
    {{< image-grid-item "*workshop4*" "Product Management and Engineers" "Image of a Product Manager showing customer expectations to engineers" >}}
    {{< image-grid-item "*workshop5*" "UI and Plaform teams as one" "Engineers talking and discussing solutions around a table" >}}
    {{< image-grid-item "*workshop6*" "Jehad presenting a roadmap" "Jehad Affoneh presenting a roadmap to his team" >}}
{{< /image-grid >}}

{{< info-box >}}
We also built a **ton** of marketing material for EVO:RAIL. I was **_so passionate_** about this project that I composed and produced the background music and performed voiceovers on the videos.
{{< /info-box >}}

{{< youtube "V3O0Ap1tWks" >}}

{{< info-box >}}
We created industry-specific marketing videos as well.
{{< /info-box >}}


{{< youtube "37CQkIUHvuk" >}}

{{< info-box >}}
We even created a few goofy ones that we filmed in our office in Palo Alto. I had a cameo in one of them (at the end)
{{< /info-box >}}

 
{{< youtube "DWTX1IEk2iQ" >}}

--- 

## Heading for stormy waters

As we built many plans and invented all kinds of super exciting technology, **_problems outside of our control_** were brewing. 

One of the biggest was not anything to do with our technology; it was **organizational**.

{{< error-box >}}

VMware is **NOT** a hardware company; it's a **_software_** company. 

{{< /error-box >}}

At the time, VMware's parent company, EMC Corporation, **WAS** a hardware company.

There was a considerable amount of friction on this matter during the entire lifetime of the project.

EVO:RAIL was a **universal** platform designed to work **_across hardware vendors_**.

The universal bit didn't go down so well when EMC was '_just another_' hardware vendor.

---

{{< inline-figure "*evorail-challenge*" "How fast could you set up EVO:RAIL 2.0?" "Picture of the EVO:RAIL challenge at VMworld 2015" >}}

---

## It needs another name again.

By December 2015, it was **all over**.

EMC was assuming control of the product from VMware. EVO:RAIL became [VXRAIL](https://www.penguinpunk.net/blog/emc-announces-vxrail/).

My journey was at an end with MARVIN.

[Dell Technologies now sells VXRAIL](https://www.delltechnologies.com/en-us/converged-infrastructure/vxrail/index.htm). It's been very successful and is now a multi-billion dollar product.

---

{{< inline-figure "*marvin-figure*" "A 3D Printed MARVIN robot has a permanent spot in my office" "Picture of the EVO:RAIL challenge at VMworld 2015" >}}

---

## MARVIN lives on

Even though the platform code has changed significantly, the UI's replaced, and the technology evolved, MARVIN is **still considered** one of VMware's most **_notable innovations_**. 

It laid the path for Dell Technologies to dominate the Hyper-Converged Infrastructure market.

{{< inline-figure "*patent*" "MARVIN is one of VMware's most notable patents of all time" "Picture of Dave and Mornay at VMworld 2018 in front of VMware's most notable Patents" >}}

The original codebase is still active internally, and it's **_still_** named MARVIN. 




