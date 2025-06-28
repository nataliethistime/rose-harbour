---
layout: '../layouts/MarkdownPage.astro'
title: 'Dotfiles'
description: 'A few config files and references that I use regularly'
---

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

[user]
  name = Natalie
  email = natalie@omg.lol
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
