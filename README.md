# README #

This is an Express Node.js project to build a web server demonstrating how to integrate Adtoniq with your Node.js based web server.

Adtoniq for Node.js implements the server-to-server communications required between your webserver and Adtoniq. Once a day Adtoniq will initiate communications with your webserver, using a secure protocol, to transmit the latest JavaScript required to ensure Adtoniq continues functioning as new ad block rules are added, or ad blockers are enhanced with new capabilities. In addition, once you are live with Adtoniq, Adtoniq will monitor your website to determine if ad blockers are adding new filter list rules specifically to block ads on your website, and if they are, Adtoniq will immediately send your site an update to ensure your advertising is not blocked. These updates sent by Adtoniq are cached between updates from Adtoniq - you can read more about caching below.

By default, Adtoniq's servers will communicate with your website using the root of your website over https, for example https://www.mysite.com/. You can customize this URL to be any URL you like, for example https://www.mysite.com/adtoniq. To customize your update URL, contact adtoniq at support@adtoniq.com and request a custom update URL.

## Caching and CDNs ##

The JavaScript is stored in a static global, so that it can quickly be injected into the <head> section of your site. If you cache your HTML, for example in a CDN, you'll need to ensure that your cache is eventually updated. Some caches are updated automatically whenever page content changes, while other caches must be updated manually. You can override updatePageCache() function to add code to manually update your cache.

In most cases, the previous version of JavaScript will continue to function for however long it takes to update your cache / CDN, even if that takes many hours. 

## Guide to what's here ##

This repository contains a sample in a simple [Express](https://expressjs.com) sever. The file app.js demonstrates how to integrate Adtoniq. This sample page tells you whether or not you are using an ad blocker.

## How to integrate this with your Node.js web server ##

There are two lines you should insert into your pages that show ads: one to inject content into your `<head>` section, and the other to inject content into your `<body>` section. Adtoniq will inject JavaScript and a style sheet into your `<head>`. Currently Adtoniq does not inject content into your `<body>` so if you omitted this line everything would still work, but the next generation of Adtoniq (due out in early 2020) will require content to be injected into the `<body>` section, so you can prepare yourself for the future by adding this line of code now and then seemlessly transition to the next generation of Adtoniq.

You will also need to provide your API key. An easy way to do this is to edit the AdtoniqLauncher.java file to include your API key on the line that looks like this:

		const adtoniq = new Adtoniq(apiKey);

Just keep in mind that if Adtoniq updates this git repository, you'll need to merge this change in again.

That's it! Contact support@adtoniq.com with any questions.