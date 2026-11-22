---
title: When almost right isn't quite right.
description: A convincing transcript isn't necessarily an accurate one. Exploring word error rates, reference transcripts and the mistakes that matter.
subtitle: Speech transcription, evaluation and why the little mistakes are sometimes the important ones.
topic: Applied AI
date: 2026-11-21
draft: false
project: ai-playground
---

Speech recognition has come a long way. Give a modern model an audio recording and you can get a remarkably convincing transcript back in seconds.

But convincing and correct aren't quite the same thing, are they?

I wanted to see how accurately a model was transcribing speech, and more importantly, where it was getting things wrong.

So I built **SpeechLab**, another experiment in my AI Playground.

Nothing particularly grand. Just a small tool that lets me run a transcription, compare it with a reference and inspect the differences.

## A number doesn't tell you everything

One of the standard ways to evaluate speech recognition is word error rate, or WER.

It counts substitutions, deletions and insertions against a reference transcript, giving you a number you can use to compare results.

Useful, certainly. But I wanted to see the actual mistakes too.

Imagine two transcripts with similar error rates. One misses a couple of unimportant words. The other gets someone's name wrong or changes a number.

Same sort of score, potentially very different consequences.

That's why I built a word-level comparison into SpeechLab. I can see what was added, what went missing and what the model thought it heard instead.

It's much more interesting than staring at a percentage.

## Sometimes the reference is wrong

Here's another thing worth remembering: the reference transcript isn't automatically correct just because you've labelled it as the reference.

If I've made a mistake transcribing the original audio, the evaluation will happily penalise the model for disagreeing with me.

Not terribly fair.

So I made the reference editable. If I spot an error, I can correct it and run the comparison again.

It's a small feature, but an important one. Evaluation is only as trustworthy as the data you're evaluating against.

## The bigger picture

Although SpeechLab is about transcription, the questions it raises aren't limited to speech recognition.

I've encountered similar challenges working on AI-assisted testing.

A generated Playwright test might run successfully, but does it actually test the behaviour we care about? Would it catch the regression it was supposed to catch?

Likewise, a transcript might look perfectly reasonable until you compare it with what was actually said.

In both cases, I want more than a green tick or a reassuring score. I want enough information to understand what happened.

## Another experiment, another rabbit hole

SpeechLab isn't intended to replace a commercial transcription service. It's a small experiment that gives me a way to inspect model behaviour and understand the evaluation process.

That's what I enjoy about building these little tools.

I can start with a fairly simple question, write some code, inspect the results and inevitably discover another question I hadn't thought of.

And sometimes the model turns out to be right and my reference was wrong.

Always good when your own experiment keeps you humble.
