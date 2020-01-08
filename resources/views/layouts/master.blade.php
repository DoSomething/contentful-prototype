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

    @include('partials.google_tag_manager_script')
    @include('partials.snowplow_script')
</head>

<body>
    @if (has_staff_access() && isset($admin) && data_get($admin, 'page'))
        @include('partials.admin-dashboard')
    @endif

    @if (session('flash_message'))
        @include('partials.flash-message')
    @endif

    <div id="fb-root"></div>
    <div id="chrome" class="chrome">
        {{-- <div class="wrapper"> --}}
            @yield('content')
            @include('partials.footer')
        {{-- </div> --}}
    </div>

    <div id="modal-portal" class="modal-portal" role="presentation"></div>

    @include('partials.customer_io_script')

    {{ isset($state) ? scriptify($state) : scriptify() }}
    {{ scriptify($env, 'ENV') }}
    {{ scriptify($auth, 'AUTH') }}

    @isset($homePage)
        {{ scriptify($homePage, 'HOMEPAGE') }}
    @endisset

    @stack('scripts')
    <script src="https://my.hellobar.com/f70465b5f088ff5df39e838a358d27109b365641.js" type="text/javascript" charset="utf-8" async="async"></script>
</body>

</html>
