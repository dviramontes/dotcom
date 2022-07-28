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

-- As of this writing, I can confirm that all of these tools work on M1+ and intel based macs.

After going through this setup on multiple machines over the years,
I’m finally taking the time to write it down and I'll try to update it as my workflow and technology preferences change.
Most of these steps and tools are very personal to me and how I like to work but you might find gems for yourself.

## Assumes

- **MacOS Monterrey** or newer
- Package management with [**homebrew**](https://github.com/junegunn/fzf). I’ll do a separate post on [**nix**](https://nixos.org/) one day 🤞🏽
- [**iterm2**](https://iterm2.com/) + [**zsh**](https://ohmyz.sh/)
- [**doom emacs**](https://github.com/doomemacs/doomemacs). No strong opinions here, just less heavy than [spacemacs](https://www.spacemacs.org/)
- (caveat: I don’t use emacs regularly, but I learned some of the most useful keybindings so I’m stuck with it for now).
- [**node.js**](https://nodejs.org/en/) via NVM, better version management for node.js
- [**fzd**](https://github.com/junegunn/fzf) as fuzzy finder
- [**Rectangle**](https://rectangleapp.com/) as window manager
- **[Clippy](https://clipy-app.com/)** as copy / paste buffer extension tool

## Applications

via package manager

```bash
# window manager
brew install --cask rectangle

# increase your paste buffer stack length from 1 to n
brew install --cask clipy

brew install --cask visual-studio-code
# github sign-in to sync settings
```

## Dependencies

Breaking these up into individual commands helps with some of the setup after (as suppose to doing a big `brew install x y z`).

```bash
brew install emacs

brew install nvm
# after
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"

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

## Environment Variables

[**Direnv**](https://direnv.net/) is a great way to keep your environment variables relatively close to the project that needs them.
[Example from project page](https://direnv.net/#quick-demo):

```bash
# Create a new .envrc. This file is bash code that is going to be loaded by
# direnv.
$ echo export FOO=foo > .envrc
.envrc is not allowed

# allow it
$ direnv allow .
direnv: reloading
direnv: loading .envrc
direnv export: +FOO

# Show that the FOO environment variable is loaded.
$ echo ${FOO-nope}
foo

# Exit the project
$ cd ..
direnv: unloading

# And now FOO is unset again
$ echo ${FOO-nope}
nope
```

## Terminal Decorator

- [**p10k**](https://github.com/romkatv/powerlevel10k#homebrew) is all i need these days, it is nice, concise and easy to setup.

## Terminal Navigation

### fzd

[Fuzzy finding](https://github.com/junegunn/fzf) is an absolute must these days as the command line args for different languages are getting increasing complex.
I'm looking at you [Clojure](https://clojure.org/)! with stuff like `clj -A:dev -M -m project.web.server.dev-main` :angry-fist-emoji:.
Use `ctrl + r` to engage fuzzy finding.

### Z

I use [**z**](https://github.com/rupa/z) frequently to jump between different directories. It works by building up a small database based on how frequently you visit those directories.
Once it's learned enough about your project, it can become quite easy for **z** to know where you wanna go next.

```bash
❯ z -l
0.255153   /Users/dav/foo
0.268972   /Users/dav/bar
0.276813   /Users/dav/war
...
```

next time you wanna go to a directory, all you have to do is

```bash
z foo
pwd
-> /Users/dav/foo
```

### Iterm2 key preferences

In iterm, go to `profiles > keys > key mappings` and select **Natural text editing**. This makes it so that you can use arrow keys in terminal navigation and a bunch of other useful keybindings come with it.

## Bash Functions

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

# returns timestamp from epoc
function usec() {
    local usecs=$1;
    local secs=$((usecs / 1000 / 1000));
    date -r $secs
}
# usage
❯ usec 1659027414045
❯ Mon Jan 19 23:50:27 EST 1970
```

## SSH

> For "silky smooth hopping" ;)

```bash
$ cat <<EOF > ~/.ssh/config
Host kimchitaco
  HostName 127.0.0.1
  User root
  IdentityFile ~/.ssh/id_rsa
EOF
```

now everytime you wanna hop to 127.0.0.1 all you have to do is `ssh kimchitaco`

## Git Config

```bash
$ cat <<EOF > ~/.gitconfig
[user]
	name = David A. Viramontes
	email = <email>
[color]
	ui = true
[core]
	editor = emacs
	excludesfile = /Users/$HOME/.gitignore_global
[alias]
	co = checkout
	cm = commit
	s  = status
	b  = branch
	up = push origin HEAD
	cp = cherry-pick
	hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
[init]
	defaultBranch = main
[pull]
	ff = true
[credential]
	helper = store
```

## Global Gitignore

```bash
$ cat <<EOF > ~/.gitignore_global
.idea
*.iml
.DS_Store
.java-version
.elixir_ls
.tool-versions
```
