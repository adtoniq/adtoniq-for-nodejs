# README #
This is a simple [Express](https://expressjs.com) demo sever. The file app.js demonstrates how to integrate Adtoniq. This sample page displays sample ads and displays whether you are using an ad blocker.

## Setup ##

This demo depends on the [adtoniq-express module](https://www.npmjs.com/package/adtoniq-express) which will be atomatically installed.
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

1. In the `<head>` of any page that you want the API to work you must inject the result of the following code:
```js
const headCode = adtoniq.getHeadCode({})
```

1. You must provide a handler for Adtoniq to transmit the latest JavaScript required to ensure Adtoniq continues functioning as new ad block rules are added, or ad blockers are enhanced with new capabilities. That handler will have to perform the following:
```js
  adtoniq.processRequest(request.body)
```

## Displaying ads ##
1. The following snippet, included in body.html, illustrates how to include ads in your pages. Adtoniq support will generate the ads to be displayed in class="foo".
```html
<p> Here is my ad
<div class="foo" style="border: 1px solid red;">
<br>I am an ad!
</div>
```

## Dealing with adblockers ##
1. The following snippet, included in head.html, illustrates how to detect whether an addblocker is being used.
```html
<div class="adtoniq_adblocked" style="display:none;color:red;">
  <h1>You are using an ad blocker</h1>
  </div>
<div class="adtoniq_nonblocked" style="display:none;color:green;">
  <h1>You are not using an ad blocker</h1>
  </div>
```

## Running ##

Runs as standard [Express](https://expressjs.com) server:

```bash
# If port other than 3000 is to be used
# PORT=...
bin/www
```

Just keep in mind that if Adtoniq updates this git repository, you'll need to merge this change in again.

## Support ##
Contact support@adtoniq.com with any questions.
