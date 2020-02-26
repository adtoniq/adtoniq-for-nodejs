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

1. First set your key.
```js
const apiKey = "Your-API-Key-Here";
```
2. Create your adtoniq object.
```js
const adtoniq = new Adtoniq(apiKey);
```
3. Optionaly, use this consructor to add functionality to manually update your cache / CDN when the JavaScript is updated. You will need to implement the following two functions and pass them to the constructor.
```js
saveScript = function(script, callback) {
  // save script
  callback()
}
loadScript = function(callback) {
  callback(<saved script or null if none saved>)
}
const adtoniq = new Adtoniq(apiKey, saveScript, loadScript);
```
4. You must provide a handler for Adtoniq to transmit the latest JavaScript required to ensure Adtoniq continues functioning as new ad block rules are added, or ad blockers are enhanced with new capabilities. That handler will have to perform the following:
```js
adtoniq.processRequest(request.body, (headCode) => {
})
```
5. Finally, do the following on every page handler where you want to integrate Adtoniq functionality.
```js
adtoniq.getHeadCode({}, (headCode) => {
    // Inject headCode to the `<head>` section.
})
```

## Displaying other ads ##
Adtoniq will target existing ads to be replced. If you want to add your own, the following snippet, included in body.html, illustrates how to do this. In this case Adtoniq support will generate the ads to be displayed in class="foo".
```html
<p> Here is my ad
<div class="foo" style="border: 1px solid red;">
<br>I am an ad!
</div>
```

## Dealing with adblockers ##
The following snippet, included in head.html, illustrates how to detect whether an adblocker is being used.
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
# If port other than 3000 is to be used set:
#export PORT=...
bin/www
```

## Support ##
Contact support@adtoniq.com with any questions.
