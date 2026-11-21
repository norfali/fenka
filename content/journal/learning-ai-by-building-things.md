---
title: Learning AI by building things
description: What a small document retrieval lab and a speech experiment taught me to look for in a model’s output.
topic: Applied AI
date: 2026-11-19
draft: true
---

A model can give you an answer in seconds and leave you with very little idea how it got there. I’m used to being able to follow a request through a system, see what each part did and decide where to look next. I wanted something that let me do the same with a model in the middle. So I started building small experiments I could run on my own machine.

## Give yourself somewhere to look

RagLab started with a question I could check. Given a small set of documents and a question with a known answer, could I get the right passage back? That meant I could postpone answer generation and look first at the machinery that would supply its context.

The choices show up quickly. A search can retrieve a paragraph that sounds relevant but leaves out the sentence I needed. I can change the chunk size or overlap, ask the same question and inspect exactly what moved. When I enable local generation, I can see the retrieved passages, which ones fit in the prompt and how long each stage took. If the answer is off, I have somewhere specific to start looking.

Separate views are useful because the same bad answer can have several causes. The right passage might never have been retrieved. It might have been retrieved and left out of the prompt. The model might have seen it and still made an unsupported claim. Each problem suggests a different change.

## A small reference goes a long way

SpeechLab made evaluation feel concrete in a different way. I can supply an editable reference for what was said, run a transcription and inspect additions, omissions and substitutions. A single error rate is handy when comparing runs, but the word-level differences show whether the model missed a name, garbled a number or stumbled over something less consequential. I can also correct the reference if that turns out to be where the error started.

For retrieval, a useful reference might be the source passage that should turn up. For generation, it might be a short list of claims the answer needs to support, with a case where the evidence is genuinely insufficient. I’d start with a handful of cases I understand well. They give me a way to compare changes before I invest in a bigger evaluation set.

## Bring the habit back to engineering

The same questions come up when I think about AI-assisted testing. A generated test that passes gives me a result I can inspect. I still need to see which behaviour it exercises and whether it would fail for the regression I care about. If an agent has called several tools on the way there, I want to be able to follow those calls as well.

These little projects give me a place to build that habit. Keeping the inputs and intermediate results visible makes it easier to decide what to measure next. It also gives me a good reason to build the next small thing.
