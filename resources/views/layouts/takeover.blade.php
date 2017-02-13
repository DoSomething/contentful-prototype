<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>DoSomething.org</title>

    <link rel="icon" type="image/ico" href="/favicon.ico?v1">
    <link rel="stylesheet" href="https://unpkg.com/@dosomething/forge@^6.7.4/dist/forge.css" media="screen, projection" type="text/css">
    <link rel="stylesheet" href="{{ asset('dist/app.css') }}" media="screen, projection" type="text/css">
</head>

<body class="takeover">
    @if (Session::has('flash_message'))
        <div class="alert">{{ Session::get('flash_message') }}</div>
    @endif

    @yield('content')
    <script type="text/javascript" src="https://unpkg.com/jquery@^3.0.0/dist/jquery.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@dosomething/forge@^6.7.4/dist/forge.js"></script>
    <script type="text/javascript" src="{{ asset('dist/app.js') }}"></script>
</body>

</html>
