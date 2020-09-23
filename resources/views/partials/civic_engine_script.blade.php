@if(config('site.civic_engine_embed_type') === 'gold')
    <script
      type="text/javascript"
      src="https://app.{{ config('site.civic_engine_client_name') }}.civicengine.com/embed.js"
      async
      defer
    ></script>
    <link
      rel="stylesheet"
      media="screen"
      src="https://app.{{ config('site.civic_engine_client_name') }}.civicengine.com/embed.css"
    />
@endif
