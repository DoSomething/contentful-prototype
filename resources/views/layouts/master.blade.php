<!DOCTYPE html>

<html lang="{{ config('app.locale') }}">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>DoSomething.org</title>

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

    <script type="text/javascript">
        var hasWorkingUrl = false; // https://git.io/vpzRA
        try { var u = new URL('b', 'http://a'); u.pathname = 'c%20d'; hasWorkingUrl = u.href === 'http://a/c%20d'; } catch(e) {}

        var features = [];
        if (!('Map' in window) || !('WeakSet' in window)) features.push('es2015')
        if (!('includes' in Array)) features.push('es2016')
        if (!('values' in Object)) features.push('Object.values');
        if (!('fetch' in window)) features.push('fetch');
        if (!hasWorkingUrl) features.push('URL');

        if (features.length) {
            var s = document.createElement('script');
            s.src = 'https://cdn.polyfill.io/v2/polyfill.min.js?features='+features.join(',');
            document.head.appendChild(s);
        }
    </script>

    <script type="text/javascript" src="{{ elixir('vendors~app.js', 'next/assets') }}"></script>
    <script type="text/javascript" src="{{ elixir('app.js', 'next/assets') }}"></script>

    @stack('scripts')
</body>

</html>
