---
layout: '../layouts/MarkdownPage.astro'
title: 'Dotfiles'
description: 'A few config files and references that I use regularly'
---

# Dotfiles

## Contents

## Git

```ini
[alias]
  ps = pull --recurse-submodules --ff-only
  as = !git add -A && git status
  create = !git checkout -b $1 && git push origin -u
  cam = commit -am
  done = push origin
  s = status
  recent = log --oneline -25
  last = log -1
  sps = "!f() { git switch $1 && git ps; }; f"
  brrr = push origin --force --no-verify
  sam = commit --amend --no-edit

[pull]
  ff = only

[init]
  defaultBranch = main

[core]
  autocrlf = false
  eol = lf
  # This path will need to be different depending on your OS etc
  excludesFile = /Users/nat/.gitignore

[user]
  name = Natalie
  email = natalie@omg.lol
```

## MacOS

A few macOS-related commands that I always have to look up when configuring a new machine.

```bash
# Fix key repeat for vim plugin enjoyers (me) for VS Code
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# Set finder's default view to "List", as it should be always
defaults write com.apple.finder FXPreferredViewStyle -string "Nlsv"
```

## Starship

Modified version of the [Pastel Powerline](https://starship.rs/presets/pastel-powerline) preset. I added a config for
the Hostname module so that the host would display in the status line if you were connected to a remote machine.

```toml
format = """
[](#9A348E)\
$os\
$username\
$hostname\
[](bg:#DA627D fg:#9A348E)\
$directory\
[](fg:#DA627D bg:#FCA17D)\
$git_branch\
$git_status\
[](fg:#FCA17D bg:#86BBD8)\
$c\
$elixir\
$elm\
$golang\
$gradle\
$haskell\
$java\
$julia\
$nodejs\
$nim\
$rust\
$scala\
[](fg:#86BBD8 bg:#06969A)\
$docker_context\
[](fg:#06969A bg:#33658A)\
$time\
[ ](fg:#33658A)\
"""

# Disable the blank line at the start of the prompt
# add_newline = false

# You can also replace your username with a neat symbol like   or disable this
# and use the os module below
[username]
show_always = true
style_user = "bg:#9A348E"
style_root = "bg:#9A348E"
format = '[$user ]($style)'
disabled = false

# The following block is modified from the original preset:
[hostname]
format = '[$ssh_symbol$hostname ]($style)'
style = "bg:#9A348E"

# An alternative to the username module which displays a symbol that
# represents the current operating system
[os]
style = "bg:#9A348E"
disabled = true # Disabled by default

[directory]
style = "bg:#DA627D"
format = "[ $path ]($style)"
truncation_length = 3
truncation_symbol = "…/"

# Here is how you can shorten some long paths by text replacement
# similar to mapped_locations in Oh My Posh:
[directory.substitutions]
"Documents" = "󰈙 "
"Downloads" = " "
"Music" = " "
"Pictures" = " "
# Keep in mind that the order matters. For example:
# "Important Documents" = " 󰈙 "
# will not be replaced, because "Documents" was already substituted before.
# So either put "Important Documents" before "Documents" or use the substituted version:
# "Important 󰈙 " = " 󰈙 "

[c]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[cpp]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[docker_context]
symbol = " "
style = "bg:#06969A"
format = '[ $symbol $context ]($style)'

[elixir]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[elm]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[git_branch]
symbol = ""
style = "bg:#FCA17D"
format = '[ $symbol $branch ]($style)'

[git_status]
style = "bg:#FCA17D"
format = '[$all_status$ahead_behind ]($style)'

[golang]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[gradle]
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[haskell]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[java]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[julia]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[nodejs]
symbol = ""
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[nim]
symbol = "󰆥 "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[rust]
symbol = ""
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[scala]
symbol = " "
style = "bg:#86BBD8"
format = '[ $symbol ($version) ]($style)'

[time]
disabled = false
time_format = "%R" # Hour:Minute Format
style = "bg:#33658A"
format = '[ ♥ $time ]($style)'
```

## Vim

```vimscript
" Enable syntax highlighting and force colours in the terminal
syntax enable
set termguicolors

" Tabsize of 2, please
set tabstop=2
set softtabstop=2

" Fill tabs with spaces
set expandtab

" Show matching brackets
set showmatch

" Show line numbers
set number

" Jump to the start of the line with shift-h
nnoremap H ^

" Jump to the end of the line with shift-l
nnoremap L $

" Jump down by a paragraph with shift-j
nnoremap J }

" Jump up by a paragraph with shift-k
nnoremap K {

" jk is escape
inoremap jk <esc>

" Use a instead of A to insert at the end of the line
nnoremap a A

" Use s instead of :w to save
nnoremap s :update<cr>

" Keep more lines around the cursor visible on the screen
set scrolloff=5

let macvim_skip_colorscheme=1

if has("gui_running")
  syntax on
  colorscheme desert
  set bs=2
  set ai
  set ruler
  set guifont=Inconsolata:h14
endif
```
