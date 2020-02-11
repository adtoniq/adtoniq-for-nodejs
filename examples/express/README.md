# README #
This is a simple [Express](https://expressjs.com) sever. The file app.js demonstrates how to integrate Adtoniq. This sample page displays sample ads and displays whether you whether or not you are using an ad blocker.

## Setup ##

```bash
npm install
```
You will first need to get your site site registered and obtain your API key. For that contact support@adtoniq.com.

## The code ##

The sample code resides in app.js

## How to integrate this with your Node.js web server ##

1. First initialize the API with your key.
```js
const apiKey = "Your-API-Key-Here";
const adtoniq = new Adtoniq(apiKey);
```

1. On any page that you want the API to work, you must inject the result of the following code in the `<head>`
```js
const headCode = adtoniq.getHeadCode({})
```

1. You must provide a handler for Adtoniq to transmit the latest JavaScript required to ensure Adtoniq continues functioning as new ad block rules are added, or ad blockers are enhanced with new capabilities. That handler will have to perform the following:
```js
  adtoniq.processRequest(request.body)
```

There are two lines you should insert into your pages that show ads: one to inject content into your `<head>` section, and the other to inject content into your `<body>` section. Adtoniq will inject JavaScript and a style sheet into your `<head>`. Currently Adtoniq does not inject content into your `<body>` so if you omitted this line everything would still work, but the next generation of Adtoniq (due out in early 2020) will require content to be injected into the `<body>` section, so you can prepare yourself for the future by adding this line of code now and then seemlessly transition to the next generation of Adtoniq.


Just keep in mind that if Adtoniq updates this git repository, you'll need to merge this change in again.

## Support ##
Contact support@adtoniq.com with any questions.
