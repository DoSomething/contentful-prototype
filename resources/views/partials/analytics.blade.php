@if(config('services.analytics.google_id'))
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', '{{ config('services.analytics.google_id') }}', 'auto');
    </script>
@endif

@if(config('services.analytics.customer_io_id') && auth()->check())
    <script type="text/javascript">
        var _cio = _cio || [];

        (function() {
            var a,b,c;a=function(f){return function(){_cio.push([f].
            concat(Array.prototype.slice.call(arguments,0)))}};b=["identify",
                "track"];for(c=0;c<b.length;c++){_cio[b[c]]=a(b[c])};
            var t = document.createElement('script'),
                s = document.getElementsByTagName('script')[0];
            t.async = true;
            t.id    = 'cio-tracker';
            t.setAttribute('data-site-id', '{{ config('services.analytics.customer_io_id')}}');
            t.src = 'https://assets.customer.io/assets/track.js';
            s.parentNode.insertBefore(t, s);
        })();

        _cio.identify({id: '{{ auth()->id() }}'});
    </script>
@endif

@if (config('services.analytics.snowplow_url'))
    <script type='text/javascript'>
        (function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
          p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
          };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
          n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,'script','//d1fc8wv8zag5ca.cloudfront.net/2.5.3/sp.js','snowplow'));
          window.snowplow('newTracker', 'cf', '{{config('services.analytics.snowplow_url')}}', {
            appId: 'dosomething-web' ,
            cookieDomain: null
        });

        window.snowplow('trackPageView');
    </script>
@endif
