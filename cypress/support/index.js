// This example support/index.js is processed and loaded
// automatically before your test files. This is a great
// place to put global configuration and behavior that
// modifies Cypress.
//
// You can read more here:
// https://on.cypress.io/configuration

import './commands';

Cypress.on('window:before:load', window => {
  const document = window.document;

  // Custom ENV veriables for the testing environment.
  window.ENV = {
    NPS_SURVEY_ENABLED: false,
    VOTER_REG_MODAL_ENABLED: false,
    SIXPACK_ENABLED: false,
    SIXPACK_BASE_URL: 'http://sixpack.test', // Our Sixpack service will throw an error if this isn't set.
  };

  // Remove built-in 'fetch' support since it cannot yet be mocked by Cypress.
  delete window.fetch; // eslint-disable-line no-param-reassign

  // And force the application to load an inlined 'fetch' polyfill (bypassing polyfill.io's
  // user-agent detection, which would assume Chrome has support built in).
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = `window.fetch=function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(JSON.parse(s.responseText))},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\\S\\n]*([\\s\\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})};`;
  document.head.appendChild(script);
});
