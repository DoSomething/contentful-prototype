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
