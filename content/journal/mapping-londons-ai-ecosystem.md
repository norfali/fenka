---
title: I started mapping London's AI companies. Then I built a miniature London.
description: How mapping London’s AI workplaces turned into a miniature city with moving trains and an experimental AI research workflow.
subtitle: An interactive exploration of London's growing AI scene, complete with miniature buildings, AI-assisted research and tiny moving trains.
topic: Data Visualisation
date: 2026-11-21
draft: true
project: london-ai-atlas
---

"London is so back!"

I keep hearing and reading about AI companies popping up all over London. Startups, big names opening new offices, and plenty of excitement around the AI scene.

It got me wondering: **where exactly are they all based?**

Not just which part of London, but which streets and buildings.

Putting them on a map seemed like a fun idea. But a bunch of pins on a flat map? Where's the fun in that?

I wanted something I could actually explore.

And somehow, that turned into building a miniature London.

## Building a little London

I wanted the map to actually *feel* like London. The Thames winding through the city, familiar parks, railway lines and buildings you might recognise if you've spent enough time wandering around.

At city level, the Thames is a pretty good starting point for getting your bearings. But once you dive into somewhere like Shoreditch or Soho, it's the smaller details that make a place recognisable.

Take the Tea Building in Shoreditch. You don't need dozens of street labels when you've got a landmark like that.

I used OpenStreetMap data for the geography and building footprints, turning them into little isometric buildings. Where building heights were available, I used them. Where they weren't, I had to make reasonable estimates.

It's not supposed to be a perfect 3D reconstruction of London. That would be quite an undertaking! I just wanted something recognisable, enjoyable to explore and grounded in real geography.

## Of course, I had to add trains

Once the buildings were in place, the city looked rather nice. But it was also a bit lifeless.

So I added tiny moving trains. And buses.

They're deliberately small. You might not even notice them at first, but then you spot a train trundling along the railway or a bus making its way through the streets.

I love those little details.

Of course, adding them meant figuring out where they should actually go. Trains need tracks, buses need roads, and neither should casually travel through buildings. A train disappearing beneath a covered section of railway also needs to stay hidden until it comes out the other side.

Probably more effort than a few tiny moving vehicles deserve, but that's half the fun of building something for yourself.

## Let the AI agents do some detective work

Now for the other half of the project: finding out where these AI companies actually work.

You'd think that would be easy. Search for a company, find its address, put a pin on the map. Job done.

Except a registered office isn't necessarily where the engineers work. Companies announce office moves before they've happened, and sometimes an address is little more than a postcode and a vague reference to London.

I didn't fancy spending hours manually investigating every company, so I started experimenting with AI agents to help with the research.

I brought together Tavily for web search and content extraction, Geoapify for geocoding, and a locally running language model through MLX to help interpret what the searches turned up.

The interesting part wasn't just getting an agent to find an address. It was making sure it didn't confidently give me the wrong one.

I added execution limits so it couldn't keep searching indefinitely, along with structured findings and a review queue. The research distinguishes between actual workplaces, registered offices, planned moves, former locations and cases where there's simply not enough information.

I also wanted to see *why* the agent reached a conclusion, so the supporting evidence is kept alongside its findings. I've been experimenting with offline replay as well, which lets me revisit results without making the same external requests over and over.

And here's the important bit: **the agent does the detective work, but it doesn't get the final say.**

I still want to check the evidence before putting a company on the map.

After all, a little pin on a beautifully rendered building looks rather convincing, even when it's completely wrong.

## Keeping up with London

There's one slight problem with mapping companies: they have a habit of moving.

New startups appear, established companies open new offices, and addresses that were correct six months ago might no longer be useful.

So I've been thinking about how to make the Atlas easy to update, rather than treating it as something that's ever truly finished.

Being able to revisit a company, check where its location came from and correct it when necessary is just as important as drawing the map in the first place.

It's an ongoing project, and I'm quite happy with that. There's always another district to improve, another company to investigate or some tiny detail that catches my eye.

## A bit of everything I enjoy

What started as a simple question has turned into a rather enjoyable mix of frontend engineering, data visualisation, geography and applied AI.

I get to work with real-world data, build interactive interfaces, experiment with AI agents and occasionally spend far too long getting a tiny animation just right.

That's one of the things I enjoy about personal projects. There's no grand product roadmap or pressure to turn every experiment into a commercial product. I can follow an interesting idea, see where it leads and learn something along the way.

And yes, I may occasionally open the Atlas just to watch the little trains go by.
