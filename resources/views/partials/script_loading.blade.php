<script type="text/javascript">
    var hasWorkingUrl = false; // https://git.io/vpzRA
    try { var u = new URL('b', 'http://a'); u.pathname = 'c%20d'; hasWorkingUrl = u.href === 'http://a/c%20d'; } catch(e) {}

    var features = [];
    if (!('Map' in window) || !('WeakSet' in window)) features.push('es2015')
    if (!('find' in Array.prototype)) features.push('Array.prototype.find')
    if (!('includes' in Array.prototype)) features.push('es2016')
    if (!('values' in Object)) features.push('Object.values');
    if (!('fetch' in window)) features.push('fetch');
    if (!hasWorkingUrl) features.push('URL');

    var scripts = [
        '{{ elixir("vendors~app.js", "next/assets") }}',
        '{{ elixir("app.js", "next/assets") }}',
    ];

    if (features.length) scripts.unshift('https://cdn.polyfill.io/v2/polyfill.min.js?features='+ features.join(','));

    // Script loader, from <goo.gl/wez2dP>. More context at <https://git.io/vpywh>.
    !function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}
    for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),
    "async" in i?(a.async=!1,e.head.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+'src="'+s
    +'" defer></'+t+">"),a.src=s}(document,"script",scripts)
</script>
