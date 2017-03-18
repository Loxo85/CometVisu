
qx.Class.define("cv.report.utils.FakeServer", {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    _xhr: {},
    _responseDelays: [],
    _index : 0,

    init: function (log, build) {

      var prependResourcePath = null;
      if (build !== qx.core.Environment.get("cv.build")) {
        // the log has not been recorded in the same build as is is replayed, some paths must be adjusted
        if (build === "build") {
          // map from build to source
          prependResourcePath = "../source/";
        }
      }

      // split by URI
      log.response.forEach(function (entry) {
        var url = entry.url;
        if (prependResourcePath && url.startsWith("resource/")) {
          url = prependResourcePath+url;
        }
        if (!this._xhr[url]) {
          this._xhr[url] = [];
        }
        this._xhr[url].push(entry);
        this._responseDelays.push(entry.delay);
      }, this);

      // configure server
      var server = qx.dev.FakeServer.getInstance().getFakeServer();
      server.respondWith(this.__respond);
      this._responseDelays.unshift(10);
    },

    __respond: function(request) {
      var xhrData = cv.report.utils.FakeServer._xhr;
      var url = cv.report.Record.normalizeUrl(request.url);
      if (url.indexOf("nocache=") >= 0) {
        url = url.replace(/[\?|&]nocache=[0-9]+/, "");
      }
      if (!xhrData[url] || xhrData[url].length === 0) {
        qx.log.Logger.error(this, "no logged responses for URI "+url+" found");
      } else {
        qx.log.Logger.debug(this, "faking response for "+url);
        var response = "";
        if (xhrData[url].length === 1) {
          response = xhrData[url][0];
        } else {
          // multiple responses recorded use them as LIFO stack
          response = xhrData[url].shift();
        }

        var server = qx.dev.FakeServer.getInstance().getFakeServer();
        server.autoRespondAfter = cv.report.utils.FakeServer._responseDelays[cv.report.utils.FakeServer._index+1];

        if (request.readyState === 4 && request.status === 404) {
          // This is a hack, sometimes the request has a 404 status and send readystate
          // the respond would fail if we do not override it here
          request.readyState = 1;
        }
        request.respond(response.status, response.headers, response.body);
        cv.report.utils.FakeServer._index++;
      }
    }
  }
});