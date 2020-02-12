'use strict'
/**
 * Module dependencies.
 * @private
 */

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * Module exports.
 * @public
 */
module.exports = class Adtoniq {
	// Set the apiKey to the API Key you receive from Adtoniq.
	apiKey = "";
	
	javaScript = "";
	version = "node v12.14.1";

  updatePageCacheFunction = null
	
	/** Construct the Adtoniq singleton and initialize it
	 * @param apiKey Your unique API key, obtained from Adtoniq when you register
	 */
	constructor(apiKey, updatePageCacheFunction) {
    this.updatePageCacheFunction = updatePageCacheFunction
		this.apiKey = apiKey;
		this.getLatestJavaScript();
    if (!!Adtoniq.instance) {
        return Adtoniq.instance;
    }
    Adtoniq.instance = this;
	}
	
	processRequest(request) {
		const adtoniqAPIKey = Adtoniq._getQueryArg(request, "adtoniqAPIKey");
		const adtoniqNonce = Adtoniq._getQueryArg(request, "adtoniqNonce");
		
		if (adtoniqAPIKey === this.apiKey && adtoniqNonce.length > 0)
			this._getLatestJavaScript(adtoniqNonce);
	}
	
    
	/** 
	 *  if updatePageCacheFunction is set call it to
	 *  manually update your cache / CDN when the JavaScript is updated.
	 */
	updatePageCache() {
		if (this.updatePageCacheFunction) {
      this.updatePageCacheFunction(this.javaScript)
    }
	}

  _updateCache(ret) {
		if (ret && ret.length > 0) {
			this.javaScript = ret;
			this.updatePageCache();
			console.log("Adtoniq for JavaScript initialized.");
		} else
			console.log("Error initializing Adtoniq for JavaScript.");
  }
	_getLatestJavaScript(nonce) {
		this._targetURL = "https://integration.adtoniq.com/api/v1"
    this._urlParameters = "operation=update&apiKey="+this.apiKey+"&version="+this.version+"&nonce="+nonce
    const ret = Adtoniq._executePost(this._targetURL, this._urlParameters, )
    this._updateCache(ret)
	}

	getLatestJavaScript() {
		this._getLatestJavaScript("");
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
	static _executePost(targetURL,  urlParameters) {
		try {
			// Create connection
      const request = new XMLHttpRequest();
      request.open('POST', targetURL, false);  // `false` makes the request synchronous
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
      request.send(urlParameters);
      var response = null;
      if (request.status == 200) {
        response = request.responseText.trim()
      } else {
        console.log("Adtoniq call failed wih status: "+request.status)
      }
			return response;
		} catch (e) {
			console.trace();
      const error = "Request failed: "+e.message
			return null;
		}
	}

}

