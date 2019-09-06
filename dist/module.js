define(["app/plugins/sdk","app/core/app_events"],function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=274)}({14:function(e,t,n){"use strict";n.d(t,"c",function(){return o}),n.d(t,"a",function(){return s}),n.d(t,"b",function(){return i}),n.d(t,"d",function(){return u});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function o(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var s=function(){return(s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function i(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{a(r.next(e))}catch(e){s(e)}}function u(e){try{a(r.throw(e))}catch(e){s(e)}}function a(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,u)}a((r=r.apply(e,t||[])).next())})}function u(e,t){var n,r,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function u(s){return function(u){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===s[0]||2===s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}}},148:function(e,n){e.exports=t},274:function(e,t,n){"use strict";n.r(t);var r=function(){function e(e,t,n){this.$q=n,this.enabled=!1,this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this))}return e.prototype.postUpdate=function(){var e=this;return this.appModel.enabled?this.appEditCtrl.importDashboards().then(function(){return e.enabled=!0,{url:"plugins/grafana-sensu-app/page/configure",message:"Sensu App enabled!"}}):this.$q.resolve()},e.templateUrl="components/config/config.html",e}(),o=n(14),s=n(148),i=n.n(s),u=function(){function e(e,t,n,r,o){this.backendSrv=n,this.contextSrv=r,this.$location=o;this.isOrgEditor=r.hasRole("Editor")||r.hasRole("Admin"),document.title="Grafana Sensu App",this.servers=[],this.pageReady=!1,this.getSensuServers()}return e.prototype.getSensuServers=function(){return o.b(this,void 0,void 0,function(){var e;return o.d(this,function(t){return e=this,[2,this.backendSrv.get("/api/datasources").then(function(t){e.servers=t.filter(function(e){return"grafana-sensucore-datasource"===e.type}),console.log("servers..."+JSON.stringify(e.servers)),e.pageReady=!0})]})})},e.prototype.confirmDelete=function(e){var t=this;this.backendSrv.delete("/api/datasources/"+e).then(function(){t.getSensuServers()})},e.prototype.deleteSensuServer=function(e){var t=this;i.a.emit("confirm-modal",{title:"Delete",text:"Are you sure you want to delete this data source?",yesText:"Delete",icon:"fa-trash",onConfirm:function(){t.confirmDelete(e.id)}})},e.prototype.addSensuServer=function(){return o.b(this,void 0,void 0,function(){var e,t,n;return o.d(this,function(r){switch(r.label){case 0:return e={name:"SensuAppCore-"+this.servers.length,type:"grafana-sensucore-datasource",access:"proxy",isDefault:!1},[4,this.backendSrv.post("/api/datasources",e)];case 1:return t=r.sent(),n=t.datasource.id,this.$location.url("/plugins/grafana-sensu-app/page/sensu-servers"),window.location.href="/datasources/edit/"+n,[2]}})})},e.prototype.serverInfo=function(e){this.$location.path("plugins/grafana-sensu-app/page/sensu-server-info").search({server:e.id})},e.templateUrl="components/servers/partials/servers.html",e}(),a=function(){function e(e,t,n,r,o,s,i){this.backendSrv=n,this.datasourceSrv=r,this.$q=o,this.$location=s,this.alertSrv=i,this.pageReady=!1,this.$q=o,this.$scope=e,document.title="Grafana Sensu App - Info",this.server={},"server"in s.search()?this.getSensuServerInfo(s.search().server):i.set("No Sensu server specified.","No Sensu server specified in url","error")}return e.prototype.getSensuServerInfo=function(e){var t=this;this.getSensuServer(e).then(function(e){t.serverDS=e,t.serverDS.getServerInfo().then(function(e){t.info=e,console.log("INFO: "+JSON.stringify(t.info)),t.pageReady=!0})})},e.prototype.getSensuServer=function(e){return o.b(this,void 0,void 0,function(){var t=this;return o.d(this,function(n){return[2,this.backendSrv.get("api/datasources/"+e).then(function(e){return t.server=e,t.datasourceSrv.get(e.name)})]})})},e.templateUrl="components/server_info/partials/server_info.html",e}(),c=n(43);n.d(t,"ConfigCtrl",function(){return r}),n.d(t,"SensuServerInfoCtrl",function(){return a}),n.d(t,"SensuServersCtrl",function(){return u}),Object(c.loadPluginCss)({dark:"plugins/grafana-sensu-app/styles/dark.css",light:"plugins/grafana-sensu-app/styles/light.css"})},43:function(t,n){t.exports=e}})});