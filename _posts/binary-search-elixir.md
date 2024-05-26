---
title: 'Binary Search in Elixir'
excerpt: 'Implementing binary search in Elixir'
date: '2024-05-03T12:00:00.0Z'
coverImage: '/assets/blog/binary-search-elixir/cover.png'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/binary-search-elixir/cover.png'
---

> **Disclaimer**: Implementing binary search in Elixir may not be as performant as in languages with native array support. Elixir's lists are linked lists, which have O(n) time complexity for accessing elements by index. This impacts the efficiency of binary search, which relies on quick random access. In contrast, languages like C or Rust have O(1) array access, making binary search more efficient. However, Elixir's choice of linked lists aligns with its design goals of immutability, concurrency, and fault tolerance. Different languages have different trade-offs and are designed for different purposes.

### Binary Search in Elixir

Let's implement a quick and dirty version of binary search, and we'll improve upon it after identifying the base case and the recursive case. We have to use recursion because [it's the only way to iterate through a list in Elixir](https://hexdocs.pm/elixir/recursion.html). Elixir also has for loops but they are more like the [list comprehensions](https://hashrocket.com/blog/posts/elixir-for-loops-go-beyond-comprehension) you find in Python.

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
        # base case 1, lucky guess
        target == guess -> mid

        # recursive case
        guess > target -> search(list, target, min, (mid - 1))
        guess < target -> search(list, target, (mid + 1), max)

        # base case 2, target not found
        true -> -1
      end
    end
  end
end
```

Notice a problem with the code above? It doesn't return `-1` if the target isn't found. We're also missing a pattern match to handle the case when the list is empty. Let's improve our algorightm with a more idiomatic Elixir by using a `case` expression instead of `cond`.

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

Notice how we added a guard `when min <= max` to `search/4` to ensure the search continues only when the minimum index is less than or equal to the maximum index. [The pin operator](https://hexdocs.pm/elixir/pattern-matching.html#the-pin-operator) `^` also helps us get rid of the `if` inside our recursive case.
