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
	// For node 10 compatibility do not declare variables
	//apiKey
	//javaScript
	//version
  //loadScript
  //saveScript
	
	/** Construct the Adtoniq singleton and initialize it
	 * @param apiKey Your unique API key, obtained from Adtoniq when you register
	 */
	constructor(apiKey, saveScript, loadScript) {
    this.javaScript = "";
	  this.version = "1.1.1";
    this.loadScript = loadScript
    this.saveScript = saveScript
		this.apiKey = apiKey;
    if (!!Adtoniq.instance) {
        return Adtoniq.instance;
    }
    Adtoniq.instance = this;
		this.getLatestJavaScript((ret) => {})
	}
	
	processRequest(request, callback) {
		const adtoniqAPIKey = Adtoniq._getQueryArg(request, "adtoniqAPIKey");
		const adtoniqNonce = Adtoniq._getQueryArg(request, "adtoniqNonce");
		
    if (adtoniqAPIKey === this.apiKey && adtoniqNonce.length > 0) {
			this._getLatestJavaScript(adtoniqNonce, callback);
    } else {
      callback(this.javaScript)
    }
	}
	
    
	/** 
	 *  if loadScript is set call it to
	 *  manually update your cache / CDN when the JavaScript is updated.
	 */
	_updatePageCache(callback) {
		if (this.saveScript) {
      this.saveScript(this.javaScript, callback)
    } else callback()
	}

	/** 
	 *  if saveScript is set call it to
	 *  st the local javascript from the cache / CDN 
	 */
	_restoreFromPageCache(callback) {
		if (this.loadScript) {
      this.loadScript((script) => {
        if (script) {
          this.javaScript = script
        }
        callback()
      })
    } else callback()
	}

	_getLatestJavaScript(nonce, callback) {
		this._targetURL = "https://integration.adtoniq.com/api/v1"
    this._urlParameters = "operation=update&apiKey="+this.apiKey+"&version="+this.version+"&nonce="+nonce
    const ret = Adtoniq._executePost(this._targetURL, this._urlParameters, (ret) => {
      if (ret && ret.length > 0) {
        this.javaScript = ret;
        this._updatePageCache(() => {
          this._restoreFromPageCache(() => {
            console.log("Adtoniq for JavaScript initialized.");
            callback(ret)
          })
        });
      } else {
        console.log("Error initializing Adtoniq for JavaScript.");
        callback(null)
      }
    })
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
	    return this.javaScript;
	}

	setJavaScript( javaScript) {
	    this.javaScript = javaScript;
	}
	
	/** Returns the HTML that should be inserted into the head section of the website
	 * @param request The HttpServletRequest that is currently be served
	 * @return The code that should be inserted into the head section
	 */
	getHeadCode(request, callback) {
		this.processRequest(request, callback);
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
		try {
			// Create connection
      const request = new XMLHttpRequest();
      request.open('POST', targetURL, true);  // `false` makes the request synchronous
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.setRequestHeader("User-Agent",
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");

			const parametersLength = ""+urlParameters.length
      // TODO: Seems illegal:
      // https://stackoverflow.com/questions/7210507/ajax-post-error-refused-to-set-unsafe-header-connection/7210840
			//request.setRequestHeader("Content-Length", ""+parametersLength)
			request.setRequestHeader("Content-Language", "en-US");
      request.setRequestHeader("Cache-Control", "no-cache");
      // TODO: What are these?
			//serverConnection.setDoInput(true);
			//serverConnection.setDoOutput(true);
      request.onreadystatechange = function() {//Call a function when the state changes.
        if (request.readyState == 4) {
          var response = null;
          var error = null;
          if (request.status == 200) {
            response = request.responseText.trim()
          } else {
            error = "Request failed with status "+request.status
            console.log(error)
          }
          callback(response)
        }
      }

			// Send request
      request.send(urlParameters);
		} catch (e) {
			console.trace();
      const error = "Request failed: "+e.message
			callback(null)
		}
	}
}

