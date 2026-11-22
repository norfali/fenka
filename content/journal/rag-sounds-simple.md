---
title: RAG sounds simple. Until you look under the bonnet.
description: Finding the right information is only half the battle. A closer look at retrieval, local generation and what happens when things go wrong.
subtitle: Retrieval, embeddings and why finding the right information is harder than it looks.
topic: Applied AI
date: 2026-11-21
draft: false
project: ai-playground
---

Retrieval-augmented generation (RAG) sounds simple enough. Give a language model some documents, ask a question and get an answer based on those documents.

Lovely. What could possibly go wrong?

Quite a bit, as it turns out.

I've been working with language models and agentic workflows professionally, particularly around AI-assisted testing and engineering automation. But I also enjoy having somewhere to experiment without the constraints of a larger project. Somewhere I can try things, pull them apart and break them without upsetting anyone.

That's where **RagLab** comes in, one of the experiments in my AI Playground.

## Finding the right bit

I started with a small collection of documents and questions where I already knew the answers. Rather than jumping straight into generating responses, I wanted to see how well retrieval worked on its own.

Could I actually find the passage I was looking for?

Sometimes, yes. Other times, I'd get something that looked relevant but missed the one sentence that mattered.

Change the chunk size, adjust the overlap, run the same question again, and the results shift around. It's surprisingly easy to retrieve something that's related to your question without retrieving something that actually answers it.

Which is a bit of a problem when you're about to hand that context to a language model and ask it to sound confident.

## Adding the language model

Once I had retrieval working, I brought local generation into the picture.

Now I could inspect the whole journey: the original question, the retrieved passages, which ones ended up in the prompt and how long each stage took.

When an answer came back wrong, I could investigate rather than immediately fiddle with the prompt.

Perhaps retrieval missed the right passage. Perhaps it found it, but the passage didn't make it into the prompt. Or perhaps the model had everything it needed and still managed to make something up.

That's the interesting bit for me. Each of those failures needs a different fix, and you won't necessarily spot the difference by looking at the final answer.

## Keeping evaluation manageable

I also wanted a way to tell whether my changes were actually improving anything.

Nothing elaborate. Just a small collection of questions with known answers that I could run repeatedly.

Change the retrieval settings, run the same questions, compare the results. Did things improve? Did something else get worse?

It's tempting to build a comprehensive evaluation framework before you've really understood what you're evaluating. I've resisted that temptation here.

A handful of cases I can explain is much more useful to me than a hundred mysterious scores.

## Why I built it

After years of working on software systems, I've developed a habit of wanting to know what happened between the input and the output.

Language models don't make that instinct disappear. If anything, they make it more useful.

RagLab gives me a small environment where I can inspect each stage, try different approaches and see where things fall apart.

And because it's my own playground, I can experiment, break things safely and start again without having to explain to anyone why I've just broken the build.

Sometimes that's the best way to learn something.
