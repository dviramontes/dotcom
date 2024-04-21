---
title: 'Building a prompt multiplexer'
excerpt: '1 prompt input -> N LLMs outputs'
coverImage: '/assets/blog/prompt-multiplexer/multiplexing-diagram.png'
date: '2024-04-19T05:35:07.322Z'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/mac-setup-guide/screenfetch-1.jpg'
---

## The problem

> What if you could prompt two different chatbots using a single prompt?

That was the idea behind the prompt multiplexer. I wanted to be able to use one prompt and sent it to multiple chatbots.
Although, I prefer [Claude](https://claude.ai/) to ChatGPT for most tasks these days, I've found it helpful to compare the output of each. 
This typically involves me copying and pasting the prompt into each chatbot and comparing the outputs side by side.


## The solution

[This idea isn't new](https://poe.com), but I wanted to build my own version of it using the real time capabilities of [Phoenix's LiveView](https://www.phoenixframework.org/).


![Multiplexing Diagram](/assets/blog/prompt-multiplexer/prompt-sketch-1.png)
The chatbots results are streams back into the main view in separate LiveView processes [(which just regular erlang/elixir process)](https://fly.io/phoenix-files/a-liveview-is-a-process/).
With output of each LLM displayed side by side, I can easily compare the quality of the responses.

As a stretch goal, we'll throw a local LLM in the mix.

### Setup

```bash
mix phx.new prompt_multi --live
```


