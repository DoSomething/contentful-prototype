<!DOCTYPE html>

<html lang="{{ config('app.locale') }}">

<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $headTitle or 'Let\'s Do This!' }} | DoSomething.org</title>

    @if(isset($metadata))
        @include('partials.metadata')
    @endif

    <link rel="preload" href="{{ elixir('vendors~app.js', 'next/assets') }}" as="script" />
    <link rel="preload" href="{{ elixir('app.js', 'next/assets') }}" as="script" />

    @include('partials.script_loading')

    <link rel="icon" type="image/ico" href="/favicon.ico?v1">
    <link rel="icon" sizes="144x144" href="/apple-touch-icon-precomposed.png">
    <link rel="stylesheet" href="{{ elixir('app.css', 'next/assets') }}" media="screen, projection" type="text/css">

    @if(config('services.analytics.google_tag_manager_id'))
        @include('partials.google_tag_manager_script')
    @endif
</head>

<body>
    @if (has_staff_access() && isset($admin))
        @include('partials.admin-dashboard')
    @endif

    @if (session('flash_message'))
        @include('partials.flash-message')
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
    @isset($homePage)
        {{ scriptify($homePage, 'HOMEPAGE') }}
    @endisset

    @stack('scripts')
</body>

</html>
