---
title: 'Building a prompt multiplexer'
excerpt: '1 prompt input, 2 LLMS outputs'
coverImage: '/assets/blog/prompt-multiplexer/multiplexing-diagram.png'
date: '2024-04-19T05:35:07.322Z'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/mac-setup-guide/screenfetch-1.jpg'
---

# Building a prompt multiplexer in LiveView

## Introduction

What if you could prompt two different chat bots using a single prompt
input? This is the problem I set out to solve. I wanted to be able to be able to compare the output of each

That was the idea behind the prompt multiplexer. I wanted to be able to use one prompt and sent it to multiple chat bots at the same time.

## The problem

Typically i use Clause and OpenAI for my chat bot needs. I wanted to be able to compare the output of each bot side by side.
but I didn't want to have to copy and paste the prompt into each chat bot.

I also wanted to try using a local LLM like GPT-Neo. 
I wanted to be able to compare the output of the local LLM with the output of the cloud based chat bots.

## Background

[The idea isn't new](https://poe.com), but I wanted to build my own version of it. I wanted to be able to use the prompt multiplexer with any chatbot, not just the ones that have built in support for it. While at the same time, showing off LiveView's capabilities for building real time applications.

## The solution

I built a LiveView application that takes a single prompt input and sends it to multiple chat bots. The chat bots are run in separate LiveView processes. The output of each chat bot is displayed side by side in the browser.

Setup
```bash
mix phx.new prompt_multiplexer --live
```

Setup our model for the chat bots
```bash
mix phx.gen.live ChatBot chat_bots name:string
```

Setup our model for the prompts
```bash
mix phx.gen.live Prompt prompts text:text
```

Setup our model for the outputs
```bash
mix phx.gen.live Output outputs text:text chat_bot_id:references:chat_bots
```
