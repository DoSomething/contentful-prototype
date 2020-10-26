function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&');

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
 
  return query;
}

var query = parseQuery(window.location.search);

if (query.test_cio_pageview && query.user_id) {
  var _cio = _cio || [];

  (function() {
    var a, b, c;
    a = function(f) {
      return function() {
        _cio.push([f].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    b = ['identify', 'track'];
    for (c = 0; c < b.length; c++) {
      _cio[b[c]] = a(b[c]);
    }

    var t = document.createElement('script'),
      s = document.getElementsByTagName('script')[0];
 
    t.async = true;
    t.id = 'cio-tracker';
    t.setAttribute('data-site-id', 'c4797aae91625d7068c9');
    t.src = 'https://assets.customer.io/assets/track.js';
    s.parentNode.insertBefore(t, s);
  })();

  _cio.identify({ id: query.user_id });
}
