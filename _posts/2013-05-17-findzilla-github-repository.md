---
title: FindZilla GitHub Repository
date: 2013-05-17T03:10:40+00:00
author: Michael Souza
layout: post
categories:
  - Chrome
  - CSS3
  - FindZilla
  - GitHub
  - HTML5
  - JavaScript
---
Last week I released the Chrome extension [FindZilla](https://chrome.google.com/webstore/detail/findzilla/aiandhcaoopdebbehlfhpcolegndplgo?hl=en&gl=US "FindZilla") that I've been developing on and off for the last few months. The experience was a great opportunity freshen up my JavaScript/ HTML5/ CSS3 skills, as well as utilize the JavaScript libraries [jQuery](http://jquery.com/ "jQuery") and [jQuery UI](http://jqueryui.com/ "jQuery UI").

In the spirit of learning and transparency, I've open sourced the FindZilla code which can be found at: [My GitHub Repository](https://github.com/MikeSouza/FindZilla "FindZilla GitHub Repository")

It occurred to me while I was developing FindZilla, that privacy conscious users like myself may be curious about the permissions required by Chrome when installing the extension:

![Findzilla Permissions]({{ site.baseurl }}/img/findzilla-permissions.png)

Obviously, the wording of the two permissions that must be granted broad and vague. They describe **potentially** what an extension is capable of accessing, not necessarily what it does in fact access and how it actually uses the information it has access to. FindZilla does not transmit any information outside of its Chrome sandbox. Nor does it track searches you've made. Any data it stores is confined to the extension's local data storage (See [Chrome Storage API](https://developer.chrome.com/extensions/storage.html#apiReference)) and is used to restore its state (i.e. when previously closed tabs are reopened), all of which can be turned off in the extension's options if you so please.

![Findzilla Options]({{ site.baseurl }}/img/findzilla-options.png)

Anyways, you don't have to take my word for it, check out the source code!