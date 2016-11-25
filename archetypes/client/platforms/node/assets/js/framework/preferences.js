"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),storage=require("../aj/storage"),Preferences=function(){function e(){_classCallCheck(this,e),this.path="preferences.json",this.data={}}return _createClass(e,null,[{key:"instance",value:function(){return e._instance||(e._instance=new e),e._instance}}]),_createClass(e,[{key:"load",value:function(){var e=this;return logger.i("Loading preferences..."),this.data={},new Promise(function(n,t){storage.exists(e.path).then(function(t){return t?storage.readText(e.path).then(function(t){logger.i("Preferences:",t);try{e.data=JSON.parse(t)}catch(r){}n(e)}):void n(e)})["catch"](function(e){return t(e)})})}},{key:"get",value:function(e){return this.data[e]}},{key:"set",value:function(e,n){this.data[e]=n}},{key:"save",value:function(){var e=this;return logger.i("Saving preferences",JSON.stringify(this.data)),new Promise(function(n,t){storage.writeText(e.path,JSON.stringify(e.data)).then(function(){n()})["catch"](function(e){return t(e)})})}},{key:"clear",value:function(){this.data={}}}]),e}();exports.Preferences=Preferences,exports.load=function(){return Preferences.instance().load()},exports.get=function(e){return Preferences.instance().get(e)},exports.set=function(e,n){return Preferences.instance().set(e,n)},exports.save=function(){return Preferences.instance().save()},exports.clear=function(){return Preferences.instance().clear()};