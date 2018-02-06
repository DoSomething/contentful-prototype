<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DoSomething.org</title>

    <link rel="icon" type="image/ico" href="/favicon.ico?v1">
    <link rel="stylesheet" href="https://unpkg.com/@dosomething/forge@^6.7.4/dist/forge.css" media="screen, projection" type="text/css">
    <link rel="stylesheet" href="{{ elixir('app.css', 'next/assets') }}" media="screen, projection" type="text/css">

    @if(isset($socialFields))
        @include('partials.social')
    @endif
</head>

<body class="takeover">
    @if (Session::has('flash_message'))
        <div class="alert">{{ Session::get('flash_message') }}</div>
    @endif

    @yield('content')

    @include('partials.analytics')
    {{ isset($state) ? scriptify($state) : scriptify() }}
    {{ isset($env) ? scriptify($env, 'ENV') : scriptify() }}

    <script type="text/javascript" src="{{ elixir('app.js', 'next/assets') }}"></script>

    @stack('scripts')
</body>

</html>
