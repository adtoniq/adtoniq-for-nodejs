![](logo.png)

# adtoniq-express
Adtoniq for Node.js implements the server-to-server communications required between your webserver and [Adtoniq](https://adtoniq.io).

## Install

```bash
npm i adtoniq-express
```

## Usage

1. Initialize the API with your key.
```js
const apiKey = "Your-API-Key-Here";
const adtoniq = new Adtoniq(apiKey);
```

1. Get header code
```js
const headCode = adtoniq.getHeadCode({})
```

1. You must provide a handler for Adtoniq to transmit the latest JavaScript required to ensure Adtoniq continues functioning as new ad block rules are added, or ad blockers are enhanced with new capabilities. That handler will have to perform the following:
```js
  adtoniq.processRequest(request.body)
```

* * *

For details and examples visit https://github.com/adtoniq/adtoniq-for-nodejs



### License

This project is licensed under the MIT License
