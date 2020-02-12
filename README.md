# README #
This is a Node.js project demonstrating how to integrate [Adtoniq](https://adtoniq.io) with your Node.js based web server.

Adtoniq for Node.js implements the server-to-server communications required between your webserver and Adtoniq. Once a day Adtoniq will initiate communications with your webserver, using a secure protocol, to transmit the latest JavaScript required to ensure Adtoniq continues functioning as new ad block rules are added, or ad blockers are enhanced with new capabilities. In addition, once you are live with Adtoniq, Adtoniq will monitor your website to determine if ad blockers are adding new filter list rules specifically to block ads on your website, and if they are, Adtoniq will immediately send your site an update to ensure your advertising is not blocked. These updates sent by Adtoniq are cached between updates from Adtoniq - you can read more about caching below.

By default, Adtoniq's servers will communicate with your website using the root of your website over https, for example https://www.mysite.com/. You can customize this URL to be any URL you like, for example https://www.mysite.com/adtoniq. To customize your update URL, contact adtoniq at support@adtoniq.com and request a custom update URL.

## Caching and CDNs ##

The JavaScript is stored in a static global, so that it can quickly be injected into the <head> section of your site. If you cache your HTML, for example in a CDN, you'll need to ensure that your cache is eventually updated. Some caches are updated automatically whenever page content changes, while other caches must be updated manually. You can override updatePageCache() function to add code to manually update your cache.

In most cases, the previous version of JavaScript will continue to function for however long it takes to update your cache / CDN, even if that takes many hours. 

## Guide to what's here ##

The [adtoniq-express](https://github.com/adtoniq/adtoniq-for-nodejs/tree/master/adtonic-express) repository contains the code to the [Adtonic npm module](https://www.npmjs.com/package/adtoniq-express).

The [examples/express](https://github.com/adtoniq/adtoniq-for-nodejs/tree/master/examples/express) repository contains a simple [Express](https://expressjs.com) sever that implements the Adtoniq functionality.

## Support ##
Contact support@adtoniq.com with any questions.
