---
title: 'To Import or Perhaps Not?'
description: 'An exploration of migrating a tiny amount of data'
date: 2020-09-23
heroImage: /blog/2020-09-23-to-import-or-perhaps-not/images/cover.png
tags: post
layout: post.ejs
---

I keep a journal using a little Rails app I built. Nothing super fancy. It's just so I can write what I'm thinking and
feeling throughout the day. Every so often I look back and think about whether I'm okay with how things are going.

Some issues came up and I ended up merging my journalling app functionality into another personal project. The
application code was really simple but of course the old entries needed to get moved across as well. So the objective
was to get the entries out of the old Postgres database and into a new one. Along the way one column needed to be
renamed as well.

_How hard can it be?_

Ugh.

I first tried to use [Rails Admin](https://github.com/sferik/rails_admin) to export the entries. Soon afterward, I
discovered that it doesn't have an import function. So it was possible to download the entries but not import them into
the new database.

Next I tried to use [pgAdmin](https://www.pgadmin.org/) to export the entries as some kind of `csv` file and then import
them into the new database. Was I able to get this to work? Nope! The import always failed because of something wrong
with the date format in the source file.

(This stunt was made particularly difficult by [Heroku](https://www.heroku.com/) hobby datastores, which appear to
contain hundreds of databases pertaining to different Heroku user's applications. Obviously your user can only access
your own database table but the performance implications were fascinating. It looked like there were 50-100 reads
occurring every second. This is why it's free and also slow sometimes!)

_So what worked?_

Okay, here we go:

1. Download a `json` file of the entires using Rails Admin
2. Edit the file to make the column changes that were required
3. Upload the file to a private Github Gist
4. Run the following Ruby code in the `rails console` of the destination app:

```ruby
require 'json'
require 'net/http'

url = URI('<Github Gist url here>')
entries = JSON.parse(Net::HTTP.get(url))

entries.each do |entry|
  e = PersonalLog::Entry.new
  e.content = entry['content']
  e.created_at = Time.zone.parse(entry['created_at'])
  e.updated_at = Time.zone.parse(entry['updated_at'])
  e.save!
end
```

This worked but I'm convinced that there was a better way eluding me.

'Till next time, I guess.
