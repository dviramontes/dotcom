---
title: 'Binary Search in Elixir'
excerpt: 'Implementing binary search in Elixir and improving it with the help of Claude.'
date: '2024-05-03T12:00:00.0Z'
coverImage: '/assets/blog/binary-search-elixir/cover.png'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/binary-search-elixir/cover.png'
---

A question I get asked is

> Is ChatGPT helpful with Elixir?

The answer is yes, and not only do recent versions of ChatGPT and [Claude](https://claude.ai/) understand Elixir code, but in the case of Claude, it can even write idiomatic Elixir code! 🤯

### Binary Search in Elixir


Let's implement a quick and dirty version of binary search, and we'll improve upon it with Claude's [latest Opus model](https://www.anthropic.com/news/claude-3-family).
We'll use [recursion since it is only way to iterate through a list in Elixir](https://hexdocs.pm/elixir/recursion.html). There are also `for` loops in Elixir but they are more like the [list comprehensions](https://hashrocket.com/blog/posts/elixir-for-loops-go-beyond-comprehension) you find in Python.

```elixir
defmodule Binary do
  def search(list, target) do
    search(list, target, 0, length(list) - 1)
  end

  def search(list, target, min, max) do
    if min <= max do
      # div performs integer division
      mid = div(max + min, 2)
      guess = Enum.at(list, mid)

      cond do
        target == guess -> mid
        guess > target -> search(list, target, min, (mid - 1))
        guess < target -> search(list, target, (mid + 1), max)
        true -> -1
      end
    end
  end
end
```

Notice a problem with the code above? It doesn't return `-1` if the target isn't found. We're missing a pattern match to handle the case when the list is empty. Not only did Claude catch this, but it also suggested a more idiomatic way to write the code using a `case` expression instead of `cond`.

```elixir
defmodule Binary do
  def search(list, target) do
    search(list, target, 0, length(list) - 1)
  end

  def search([], _target, _min, _max), do: -1

  def search(list, target, min, max) when min <= max do
    mid = div(max + min, 2)

    case Enum.at(list, mid) do
      ^target -> mid
      guess when guess > target -> search(list, target, min, mid - 1)
      _ -> search(list, target, mid + 1, max)
    end
  end

  def search(_list, _target, _min, _max), do: -1
end

Binary.search([1, 2, 3, 4, 5], 3) # => 2
Binary.search([1, 2, 3, 4, 5], 6) # => -1
```

It also added a guard `when min <= max` to `search/4` to ensure the search continues only when the minimum index is less than or equal to the maximum index. I'm impressed with Claude's abilities to write Elixir and other functional code. 
