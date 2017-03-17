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

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-493209-1', 'auto');
  ga('send', 'pageview');
</script>
<script type="text/javascript">
  !function(a,b){a("Keen","https://d26b395fwzu5fz.cloudfront.net/3.4.1/keen.min.js",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]=function(b){c["_"+a].clients=c["_"+a].clients||{},c["_"+a].clients[b.projectId]=this,this._config=b},c[a].ready=function(b){c["_"+a].ready=c["_"+a].ready||[],c["_"+a].ready.push(b)},d=["addEvent","setGlobalProperties","trackExternalLink","on"];for(var g=0;g<d.length;g++){var h=d[g],i=function(a){return function(){return this["_"+a]=this["_"+a]||[],this["_"+a].push(arguments),this}};c[a].prototype[h]=i(h)}e=document.createElement("script"),e.async=!0,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);
</script>
{{ isset($state) ? scriptify($state) : scriptify() }}

<script type="text/javascript" src="{{ asset('dist/app.js') }}"></script>
</body>

</html>
