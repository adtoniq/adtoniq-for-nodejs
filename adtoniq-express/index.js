'use strict'
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = class Adtoniq {
	// Set the apiKey to the API Key you receive from Adtoniq.
	apiKey = "";
	
	javaScript = "";
	version = "node v12.14.1";
	
	/** Construct the Adtoniq singleton and initialize it
	 * @param apiKey Your unique API key, obtained from Adtoniq when you register
	 */
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.getLatestJavaScript();
    if (!!Adtoniq.instance) {
        return Adtoniq.instance;
    }
    Adtoniq.instance = this;
	}
	
	processRequest(request, callback) {
		const adtoniqAPIKey = Adtoniq._getQueryArg(request, "adtoniqAPIKey");
		const adtoniqNonce = Adtoniq._getQueryArg(request, "adtoniqNonce");
		
		if (adtoniqAPIKey === this.apiKey && adtoniqNonce.length > 0)
			this._getLatestJavaScript(adtoniqNonce, callback);
	}
	
    
	/** By default, do nothing to update page caches. Override this method to
	 *  manually update your cache / CDN when the JavaScript is updated.
	 */
	updatePageCache() {
		
	}

  _updateCache(ret) {
		if (ret && ret.length > 0) {
			this.javaScript = ret;
			this.updatePageCache();
			console.log("Adtoniq for Java initialized.");
		} else
			console.log("Error initializing Adtoniq for Java.");
  }
	_getLatestJavaScript(nonce, callback) {
		this._targetURL = "https://integration.adtoniq.com/api/v1"
    this._urlParameters = "operation=update&apiKey="+this.apiKey+"&version="+this.version+"&nonce="+nonce
    const ret = Adtoniq._executePost(this._targetURL, this._urlParameters, )
    this._updateCache(ret, callback)
	}

	getLatestJavaScript(callback) {
		this._getLatestJavaScript("", callback);
	}

	getApiKey() {
		return this.apiKey;
	}

	setApiKey( apiKey) {
		this.apiKey = apiKey;
	}

	getJavaScript() {
	    const ret = this.javaScript;
	    return ret;
	}

	setJavaScript( javaScript) {
	    this.javaScript = javaScript;
	}
	
	/** Returns the HTML that should be inserted into the head section of the website
	 * @param request The HttpServletRequest that is currently be served
	 * @return The code that should be inserted into the head section
	 */
	getHeadCode(request) {
		this.processRequest(request);
		return this.getJavaScript();
	}
	
	/** Returns the HTML that should be inserted into the body section of the website
	 * @return The code that should be inserted into the body section
	 */
	getBodyCode() {
		return "";
	}

	static _getQueryArg(request,  argName) {
		const ret = request[argName];
		
		return ret == null ? "" : ret.trim();
	}

	get urlParameters() {
    return this._urlParameters
  }
	get targetURL() {
    return this._targetURL
  }
	static _executePost(targetURL,  urlParameters, callback) {
    const async = callback != null
		try {
			// Create connection
      const request = new XMLHttpRequest();
      request.open('POST', targetURL, async);  // `false` makes the request synchronous
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.setRequestHeader("User-Agent",
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");

			const parametersLength = ""+urlParameters.length
      console.log(parametersLength)
      // TODO: Seems illegal:
      // https://stackoverflow.com/questions/7210507/ajax-post-error-refused-to-set-unsafe-header-connection/7210840
			//request.setRequestHeader("Content-Length", ""+parametersLength)
			request.setRequestHeader("Content-Language", "en-US");
      request.setRequestHeader("Cache-Control", "no-cache");
      // TODO: What are these?
			//serverConnection.setDoInput(true);
			//serverConnection.setDoOutput(true);

			// Send request
      if (async) {
        request.onreadystatechange = function() {//Call a function when the state changes.
          if (request.readyState == 4) {
            var response = null;
            var error = null;
            if (request.status == 200) {
              response = request.responseText.trim()
            } else {
              error = "Request failed with status "+request.status
            }
            callback(request.status, request.responseText)
          }
        }
      }
      request.send(urlParameters);
      var response = null;
      if (request.status == 200) {
        response = request.responseText.trim()
      }
			return response;
		} catch (e) {
			console.trace();
      const error = "Request failed: "+e.message
      if (async) callback(error, null)
			return null;
		}
	}

}

