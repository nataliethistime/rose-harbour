---
title: 'GitHub Default Branch'
description: 'In response to the changing of words in tech'
pubDate: 'June 19 2020'
heroImage: './images/cover.png'
---

Two days ago GitHub changed their default branch name from `master` to `main`. Though this was not mentioned on
their [blog](https://github.blog/) or [changelog](https://github.blog/changelog/) it
was [reported on](https://www.bbc.com/news/technology-53050955) fairly widely. It
reached [Hacker News](https://news.ycombinator.com/item?id=23531032) wherein many discussions occurred. Many response
articles have been written, which are worth a read if you're interested.

I think there are two questions at play: *Why* should it be changed? and *What* should it be changed to?

The question of *What* is fairly simple, just pick one. I would suggest one of the following:

- trunk
- main
- home
- root

The question of *Why* is the real source of controversy.

*Is anyone actually offended by this language?* I don't know.

*Does this language actually carry the master/slave connotation that is being claimed?* Many feel not.

*Is it easier to do nothing?* Certainly.

My reading from the discussions is that many are seeing the change of the default name as a signal that they now have to
change the `master` branch on all of their existing repositories. Which is a legitimate hassle. Many are seeing this as
a slippery slope - who can tell where it leads?

Here's what I think. The programming community is diverse and it's hard to know for certain whether terms are offensive
(or even just *'a little bit off'*). The database community has already had this discussion and the action taken was to
rename `master`/`slave` to `primary`/`replica`. If the term "master branch" has any semblance of the same dichotomy
(which it can), then the best course is to change the term.

Renaming the branch will break some tools. It can be a pain in the ass. But if this use of terminology is making the
development work of anyone more difficult than it needs to be, then I'm all for it.

I have recently contributed to a script for automatically making this
change: [github-default-branch](https://github.com/mheap/github-default-branch). It can scan through your user account
or organisation to rename `master` to `main` (or any other name you specify) automatically. It also updates references
in Pull Requests, changes certain references in text files, and fixes branch protection rules. I had this issue fixed
for all of my repositories in an evening (including needing to fix a bug in the script).

As for where this is going, all I can say is 'somewhere'. There were several references to Newspeak in the
aforementioned discussions, which I find to be bland and ignorant. Words fucking matter. And they matter differently to
different individuals.

The idea that you can make references to Orwell and think you're clever is flippant and misses the point of this
discussion. Which is that to create a system that is reasonably fair, reasonably safe, and reasonably usable, you must
be willing to make changes.

P.S. Today is Juneteenth. Black Lives Matter. Defund the Police. Have a nice day :)

P.P.S. Octocat header art by [Marwative](https://dribbble.com/marwative)
