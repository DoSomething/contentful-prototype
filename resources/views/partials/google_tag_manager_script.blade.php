@if(config('services.analytics.google_tag_manager_id'))
    <script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-{{config('services.analytics.google_tag_manager_id')}}');
    </script>
@else
    {{-- Mocked function to allow showing console logs. --}}
    <script type='text/javascript'>
        window.dataLayer = {};
        window.dataLayer.push = function() {};
    </script>
@endif

{{-- When/if we implement server-side rendering of React, we should add the noscript code back in! --}}
