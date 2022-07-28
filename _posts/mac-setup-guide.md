---
title: 'mac setup guide for web development'
excerpt: 'An opinionated setup guide for web development on a mac'
coverImage: '/assets/blog/mac-setup-guide/screenfetch-1.jpg'
date: '2022-07-28T05:35:07.322Z'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/mac-setup-guide/screenfetch-1.jpg'
---

Most of these steps and tools are very personal to me and how I like to work but you might find gems for yourself. After going through this setup on multiple machines over the years, I’m finally taking the time to write it down and try to update as I as things change workflows. This setup works best if you’re setting up an environment for web development on a mac . As of this writing, I can confirm that all of these tools work on M1+ and intel based macs.

## assumes

- package management with [**homebrew**](https://github.com/junegunn/fzf)
  - I’*ll do a separate post on nix one day* 🤞🏽
- [**iterm2](https://iterm2.com/) + [zsh](https://ohmyz.sh/)**
- [**doom emacs**](https://github.com/doomemacs/doomemacs)
  - no strong opinions here, just less heavy than [spacemacs](https://www.spacemacs.org/) (caveat: i don’t use emacs regularly, but I learned some of the most useful keybindings so i’m stuck with it for now).
- [**node.js**](https://nodejs.org/en/) via nvm
  - better version management for node.js
- [**fzd**](https://github.com/junegunn/fzf) for fuzzy finder
- [**Rectangle**](https://nodejs.org/en/) as window manager
- **[Clippy](https://nodejs.org/en/)** as copy / paste buffer extension tool

## applications

```bash
# window manager
brew install --cask rectangle
# increases your paste buffer stack length from 1 to N
# https://clipy-app.com/
brew install --cask clipy https://clipy-app.com/
# vscode 
brew install --cask visual-studio-code
# after
# github sign-in to sync settings
```

## dependencies

Breaking these up into individual commands helps with some of the setup after (as suppose to doing a big `brew install xyz ... ...`).

```bash
brew install --cask visual-studio-code

brew install emacs

brew install nvm
# after
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This load$

brew install fzf
# after 
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

brew install z
# after
. /usr/local/etc/profile.d/z.sh

brew install direnv
# after
eval "$(direnv hook zsh)"
```

## functions

```bash
function gitinit(){
    git init && git add . -v && git commit -am 'init'
}

function masterToMain(){
    git branch -m master main
    git fetch origin
    git branch -u origin/main main
    git remote set-head origin -a
}

function usec(){
    local usecs=$1;
    local secs=$((usecs / 1000 / 1000));
    date -r $secs
}
```
