<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>DoSomething.org</title>

    <link rel="icon" type="image/ico" href="/favicon.ico?v1">
    <link rel="stylesheet" href="https://unpkg.com/@dosomething/forge@^6.7.4/dist/forge.css" media="screen, projection" type="text/css">
    <link rel="stylesheet" href="{{ asset('dist/app.css') }}" media="screen, projection" type="text/css">

    @if(isset($shareFields))
        @include('partials.social')
    @endif
</head>

<body>
    <div id="fb-root"></div>
    <div class="chrome">
        <div class="wrapper">
            @include('partials.navigation')
            @yield('content')
        </div>
    </div>

    @include('partials.analytics')
    {{ isset($state) ? scriptify($state) : scriptify() }}

    <script type="text/javascript" src="{{ asset('dist/app.js') }}"></script>
</body>

</html>
