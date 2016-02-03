---
title: The hardest habit to kick when coding Python
subtitle: The semi-colon reflex
date: 2013-05-26T09:04:20+00:00
author: Michael Souza
layout: post
categories:
  - Python
---
I _like_ Python, and I can see myself **loving it** the more I use it, especially since it's great for when I need to write a quick script to do something. But whenever I'm coding Python, I find it particularly difficult to break the habit of terminating statements with a semi-colon.

Having spent most my personal, academic, and professional time coding in C-style syntax programming languages, terminating statements with a semi-colon has become less like a habit and more accurately like an involuntary reflex ingrained in muscle memory. I'm glad that the designers of Python decided to allow semi-colon statement termination as valid syntax, despite it being unnecessary and poor practice.

Alas, until I can completely suppress this "reflex" when I'm coding Python, I use the following command to strip out any stray semi-colons I may have accidentally left behind:

{% highlight bash %}
sed "s/[[:blank:]]*;[[:blank:]]*$//" test.py
{% endhighlight %}