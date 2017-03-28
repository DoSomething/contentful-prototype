<meta property="og:title" content="{{ $shareFields['title'] }}" />
<meta property="og:type"  content="article" />
<meta property="og:description" content="{{ $shareFields['callToAction'] }}" />


{{-- Exposing the URL in our current setup causes funky side effects because of redirect rules
     and Facebook seems capable of working without it. --}}
{{-- <meta property="og:url" content="https://dosomething.org/campaigns/{{ $campaign->slug }}" /> --}}

<meta property="og:image" content="{{ $shareFields['coverImage'] }}" />

<meta property="fb:app_id" content="{{ $shareFields['facebookAppId'] }}" />

{{-- This is a non-blocking script --}}
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId: '{{ $shareFields['facebookAppId'] }}',
      xfbml: true,
      version: 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
