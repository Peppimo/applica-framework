"use strict";exports.isEmpty=function(t){return void 0==t?!0:null==t?!0:t instanceof Array?0==t.length:""==t?!0:!1},exports.isNotEmpty=function(t){return!exports.isEmpty(t)};