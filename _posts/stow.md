---
title: 'Using stow to manage dotfiles on multiple machines'
excerpt: "If you work across multiple systems, you've likely accumulated a collection of configuration files over time."
coverImage: '/assets/blog/stow/stow.png'
date: '2025-03-01T05:35:07.322Z'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/stow/stow.png'
---

# A Practical Guide to using Stow

## Introduction

If you work on multiple machines like me, you've likely accumulated a collection of configuration files over time. In this blog post, I'll explain how I use GNU Stow to organize and manage dotfiles efficiently.

## What is GNU Stow?

[GNU Stow](https://www.gnu.org/software/stow/manual/stow.html) is a symlink farm manager that helps organize dotfiles in a single directory structure. It's particularly useful because it allows you to version your configurations with Git while keeping your home directory clean.

## My Dotfiles Repository Structure

[My dotfiles repository](https://github.com/dviramontes/dotfiles) is organized with a directory for each application or tool I use

```
dotfiles/
├── alias/               # shell aliases
│   └── .alias.sh
├── clj/                 # clojure config
│   └── deps.edn
├── gitconfig/           # git config
│   └── .gitconfig
├── gitignore/           # global gitignore
│   └── .gitignore
├── zed/                 # zed keybindings and language server config
│   └── zed.json
├── zsh/                 # zsh config
│   └── .zshrc
...
```

Each directory contains the configuration files for a specific tool, organized as they would appear relative to my home directory.

## Using Stow to Manage Dotfiles

Stow creates symbolic links from your home directory to the files in your stow directory, allowing you to maintain files in their own separate package directories.

Here's how I use stow to deploy my configurations:

```bash
# Stow all configurations
stow */

# Or stow individual configurations
stow zsh
stow gitconfig
```

When I run `stow zsh`, stow creates a symlink from `~/.zshrc` to `~/dotfiles/zsh/.zshrc`. Similarly, `stow gitconfig` creates a symlink for `~/.gitconfig`.
And because this is a symlink, any changes made to the original file will be reflected in both places allowing you to track changes easily.

Verify the symlinks by running `ls -l` in your home directory.

```bash
ls -l ~/.zshrc
lrwxr-xr-x@ - dv  1 Mar 14:34 /Users/dv/.zshrc -> local/dviramontes/dotfiles/zsh/.zshrc
```

### Installation Process

To set up a new machine with your dotfiles:

- `brew install stow`

- Clone the dotfiles repository:
   ```bash
   git clone https://github.com/username/dotfiles.git ~/.dotfiles
   cd ~/.dotfiles
   ```
- Install necessary packages using your preferred package manager

- Use Stow to create symbolic links:
   ```bash
   stow */  # Or stow individual packages
   ```
   
## Conclusion

GNU Stow provides an elegant solution for managing dotfiles. With a simple naming scheme and directory structure, you can maintain a clean home directory while keeping all configurations backed up and version controlled. If you're looking to organize your dotfiles across multiple machines, give GNU Stow a try.
