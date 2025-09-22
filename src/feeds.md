---
title: Feeds
description: Listing of rss feeds that can be subscribed to
layout: page.ejs
---

# Feeds

- **Blog**: <a href='/rss.xml' target='_blank'><%= `${meta.url}/rss.xml` %></a></li>
- **Drives**: <a href='/drives.xml' target='_blank'><%= `${meta.url}/drives.xml` %></a></li>

I'm not sure if these should be together and use rss `category` elements or whether it's better to have them separate.
Feel free to <a href='<%= meta.siteRepository %>/issues' target='_blank'>file an issue</a> if you have any ideas!

Powered by RSS <span style='display: inline-block; margin-left: 5px;'><%- include('/rss-icon.ejs') %></span>
