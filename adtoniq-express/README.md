![](logo.png)

# adtoniq-express
Adtoniq for Node.js implements the server-to-server communications required between your webserver and [Adtoniq](https://adtoniq.io).

## Install

```bash
npm i adtoniq-express
```

## Usage

### Get your API key. ###
```js
const apiKey = "Your-API-Key-Here";
```

### Initialize the API with your key. ###
```js
const adtoniq = new Adtoniq(apiKey);
```

Optionaly, use this consructor to add functionality to manually update your cache / CDN when the JavaScript is updated. You will need to implement the following two functions and pass them to the constructor
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

### Implement functionality ###
Implement the following on every page handler where you want to integrate Adtoniq functionality.
```js
adtoniq.getHeadCode({}, (headCode) => {
    // Inject headCode to the `<head>` section.
})
```

### Process server refresh ###
You must provide a handler for Adtoniq to transmit the latest JavaScript required to ensure Adtoniq continues functioning as new ad block rules are added, or ad blockers are enhanced with new capabilities. That handler will have to perform the following:
```js
adtoniq.processRequest(request.body, (headCode) => {
})
```

### Process external cache refresh ###
When using exernal caching of the script and the cache is updated you must update adtoniq by calling:
```js
adtoniq.setJavaScript(<updated script>)
```
* * *

For details and examples visit https://github.com/adtoniq/adtoniq-for-nodejs



### License

This project is licensed under the MIT License
