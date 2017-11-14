<!DOCTYPE html>

<html lang="en">

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
    <div class="chrome">
        <div class="wrapper">
            @include('partials.navigation')
            @yield('content')
            @include('partials.footer')
        </div>
    </div>

    @include('partials.analytics')
    {{ isset($state) ? scriptify($state) : scriptify() }}
    {{ isset($env) ? scriptify($env, 'ENV') : scriptify() }}

    <script type="text/javascript" src="{{ elixir('app.js', 'next/assets') }}"></script>
</body>

</html>
