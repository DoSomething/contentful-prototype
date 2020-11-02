@if(should_track_customer_io_page_view())
    <script type="text/javascript">
        {{-- https://customer.io/docs/javascript-quick-start --}}
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

        _cio.identify({id: '{{ get_user_id_for_customer_io() }}' });
    </script>
@endif
