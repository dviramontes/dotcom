---
title: 'Using stow to manage dotfiles on multiple machines'
excerpt: 'stow is a symlink farm manager that takes distinct packages of software and/or data and makes them appear to be installed in the same place'
coverImage: '/assets/blog/stow/stow.png'
date: '2025-03-01T05:35:07.322Z'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/mac-setup-guide/screenfetch-1.jpg'
---

# A Practical Guide to using Stow

## Introduction

If you're a developer who works on multiple machines, you've likely accumulated a collection of configuration files (dotfiles) over time. 
Managing these files across different machines can be a real pain. In this blog post, I'll explain how I use GNU Stow to organize and manage my dotfiles efficiently.

## What is GNU Stow?

[GNU Stow](https://www.gnu.org/software/stow/manual/stow.html) is a symlink farm manager that takes distinct packages of software and/or data and makes them appear to be installed in the same place. It's particularly useful for managing dotfiles because it allows you to:

1. Keep all your configurations in a single directory structure
2. Version control your dotfiles using Git
3. Easily deploy configurations to new systems
4. Selectively use configurations based on your needs

## My Dotfiles Repository Structure

My dotfiles repository is organized with a directory for each application or tool I use:

```
dotfiles/
├── alias/               # Shell aliases
│   └── .alias.sh
├── clojure/             # Clojure global configuration
│   └── deps.edn
├── gitconfig/           # Git configuration
│   └── .gitconfig
├── gitignore/           
│   └── .gitignore
├── zsh/                 # Zsh configuration
│   └── .zshrc
├── Brewfile             # Homebrew packages
└── ...
```

Each directory contains the configuration files for a specific tool, organized as they would appear relative to my home directory.

## Using Stow to Manage Dotfiles

Stow works by creating symbolic links from the target directory (usually your home directory) to the files in the stow directory. The key benefit is that you maintain the files in their own separate package directories.

Here's how I use stow to deploy my configurations:

```bash
# Stow all configurations
stow */

# Or stow individual configurations
stow zsh
stow gitconfig
```

When I run `stow zsh`, for example, stow creates a symlink from `~/.zshrc` to `~/dotfiles/zsh/.zshrc`. This means I can edit either file and the changes will be reflected in both places.

## Shell Configuration with Zsh

My Zsh configuration (`.zshrc`) is fairly comprehensive, including:

- Oh-My-Zsh setup with the "robbyrussell" theme
- Git plugin for Git integration
- Integration with z for quick directory navigation
- NVM for Node.js version management
- FZF for fuzzy file finding
- Custom aliases loaded from a separate file

## Shell Aliases

I keep my aliases in a separate file (`.alias.sh`) for better organization. Some of my aliases include:


## Git Configuration

My Git configuration includes user information, editor preferences, color settings, and helpful aliases:

```
[user]
    name = John Doe
    email = john.doe@example.com

[core]
    editor = nvim
    whitespace = fix,-indent-with-non-tab,trailing-space,cr-at-eol
    excludesfile = ~/.gitignore

[alias]
    st = status
    ci = commit
    co = checkout
    # more aliases...

[init]
    defaultBranch = main
```

## Managing Packages with Homebrew

I use Homebrew to install and manage software packages on macOS. My Brewfile includes:

### Development Tools
- Git, Neovim, and Stow for development
- Tools like ripgrep, z, fzf, and jq for efficient workflows
- ASDF for version management
- Docker for containerization

### Applications
- Browsers like Google Chrome and Firefox
- Terminal emulator (iTerm2)
- Code editors (Visual Studio Code)
- Communication apps (Slack, Discord)

### Installation Process

To set up a new machine with my dotfiles and applications:

1. Clone the dotfiles repository:
   ```bash
   git clone https://github.com/username/dotfiles.git ~/.dotfiles
   cd ~/.dotfiles
   ```

2. Install Homebrew packages:
   ```bash
   brew bundle
   ```

3. Use Stow to create symbolic links:
   ```bash
   stow */  # Or stow individual packages
   ```

## Benefits of This Approach

- **Modular**: I can add, remove, or modify configurations for individual tools without affecting others
- **Portable**: Easy to set up new machines with my preferred configurations
- **Versioned**: All changes are tracked in Git, making it easy to revert changes or synchronize across machines

## Conclusion

GNU Stow provides an elegant solution for managing dotfiles. By organizing configurations into a clear directory structure and using symbolic links, I can maintain a clean home directory while still having all my configurations backed up and version controlled. Combined with Homebrew for package management, this approach makes setting up new machines or recovering from system issues much simpler.

If you're looking to organize your dotfiles, I highly recommend giving GNU Stow a try.

My dotfiles repository: [https://github.com/dviiramontes/dotfiles](https://github.com/dviramontes/dotfiles)

