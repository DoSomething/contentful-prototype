<meta property="og:title" content="{{ $socialFields['title'] }}" />
<meta property="og:type"  content="article" />
<meta property="og:description" content="{{ $socialFields['callToAction'] }}" />


{{-- Exposing the URL in our current setup causes funky side effects because of redirect rules
     and Facebook seems capable of working without it. --}}
{{-- <meta property="og:url" content="https://dosomething.org/campaigns/{{ $campaign->slug }}" /> --}}

<meta property="og:image" content="{{ $socialFields['coverImage'] }}" />

<meta property="fb:app_id" content="{{ $socialFields['facebookAppId'] }}" />

{{-- This is a non-blocking script --}}
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId: '{{ $socialFields['facebookAppId'] }}',
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
