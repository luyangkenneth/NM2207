---
layout: post
title:  "Publishing diary entries with Jekyll and Markdown"
date:   2018-04-05 22:11:31 +0800
---
A few days ago, I wrote my first diary entry in a plain HTML file with practically no styling and layout. This required me to juggle both content (English text) and formatting (HTML tags) at the same time. For example, I had to specify all hyperlinks with `<a>` tags, and wrap my paragraphs with `<p>` tags, hence making for a subpar writing experience.

As someone who is fluent in [Markdown][markdown], a powerful markup language for the web, I knew there was an easier way to publish my subsequent diary entries. After just half a day of installation and minimal configuration, my diary is now a statically generated website. I accomplished this with the help of [Jekyll][jekyll], one of the most popular static site generators.

Writing a new post now becomes an extremely simple task. All I have to do is to create a new `*.md` file in the `_posts` folder of my code repository, and run a single command to rebuild the site. A link to the new post will even show up on the homepage, and all this happens automatically without me wrangling with any more HTML.

Jekyll also provides a great out-of-the-box experience for styling the site when combined with Markdown. I'm really happy with how everything turned out with this clean and minimal Jekyll theme.

Finally, if you're interested to find out what goes into these Markdown files, check out the [raw version][raw] of this post over at my GitHub repository.

[markdown]: https://en.wikipedia.org/wiki/Markdown
[jekyll]: https://jekyllrb.com/
[raw]: https://raw.githubusercontent.com/luyangkenneth/NM2207/master/diary/_posts/2018-04-05-publishing-diary-entries-with-jekyll-and-markdown.md
