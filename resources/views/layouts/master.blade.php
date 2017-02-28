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
</head>

<body>
<div class="chrome">
    <div class="wrapper">
        <div class="navigation -floating -white">
            <a class="navigation__logo" href="{{ url('/') }}"><span>DoSomething.org</span></a>
            <a class="navigation__toggle js-navigation-toggle" href="#"><span>Show Menu</span></a>
            <div class="navigation__menu">
                <ul class="navigation__primary">
                    <li>
                        <a href="{{ url('campaigns') }}">
                            <strong class="navigation__title">Explore Campaigns</strong>
                            <span class="navigation__subtitle">Any cause, any time, anywhere.</span>
                        </a>
                    </li>
                </ul>
                <ul class="navigation__secondary">
                    <li>
                        @if (Auth::user())
                            <a href="{{ url('logout') }}">Log Out</a>
                        @else
                            <a href="{{ url('login') }}">Log In</a>
                        @endif
                    </li>
                </ul>
            </div>
        </div>

        @yield('content')
    </div>
</div>
<script type="text/javascript" src="https://unpkg.com/jquery@^3.0.0/dist/jquery.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/@dosomething/forge@^6.7.4/dist/forge.js"></script>
<script type="text/javascript" src="{{ asset('dist/app.js') }}"></script>

{{ isset($state) ? scriptify($state) : scriptify() }}
</body>

</html>
