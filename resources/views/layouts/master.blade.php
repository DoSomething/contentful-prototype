<!DOCTYPE html>

<html lang="{{ config('app.locale') }}">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>DoSomething.org</title>

    <link rel="preload" href="{{ elixir('vendors~app.js', 'next/assets') }}" as="script" />
    <link rel="preload" href="{{ elixir('app.js', 'next/assets') }}" as="script" />

    <script type="text/javascript">
        var hasWorkingUrl = false; // https://git.io/vpzRA
        try { var u = new URL('b', 'http://a'); u.pathname = 'c%20d'; hasWorkingUrl = u.href === 'http://a/c%20d'; } catch(e) {}

        var features = [];
        if (!('Map' in window) || !('WeakSet' in window)) features.push('es2015')
        if (!('includes' in Array.prototype)) features.push('es2016')
        if (!('values' in Object)) features.push('Object.values');
        if (!('fetch' in window)) features.push('fetch');
        if (!hasWorkingUrl) features.push('URL');

        const scripts = [
            '{{ elixir("vendors~app.js", "next/assets") }}',
            '{{ elixir("app.js", "next/assets") }}',
        ];

        if (features.length) scripts.unshift('https://cdn.polyfill.io/v2/polyfill.min.js?features='+ features.join(','));

        // Script loader, from <goo.gl/wez2dP>
        !function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}
        for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),
        "async" in i?(a.async=!1,e.head.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+'src="'+s
        +'" defer></'+t+">"),a.src=s}(document,"script",scripts)
    </script>

    <link rel="icon" type="image/ico" href={{config('app.url') . "/favicon.ico?v1" }}>
    <link rel="stylesheet" href="{{ elixir('app.css', 'next/assets') }}" media="screen, projection" type="text/css">

    @if(isset($socialFields))
        @include('partials.social')
    @endif
</head>

<body>
    @if (session('flash_message'))
        <div class="{{session('flash_message')['class']}}">
            <em>{{ session('flash_message')['text'] }}</em>
        </div>
    @endif

    <div id="fb-root"></div>
    <div id="chrome" class="chrome">
        <div class="wrapper">
            @include('partials.navigation')
            @yield('content')
            @include('partials.footer')
        </div>
    </div>

    <div id="modal-portal" class="modal-portal" role="presentation"></div>

    @include('partials.analytics')
    {{ isset($state) ? scriptify($state) : scriptify() }}
    {{ scriptify($env, 'ENV') }}
    {{ scriptify($auth, 'AUTH') }}

    @stack('scripts')
</body>

</html>
