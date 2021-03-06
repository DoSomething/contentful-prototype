@php
    // Hacky! This lets us hard-coded metadata for client-rendered pages.
    // We'll be able to handle this way more gracefully in the future.
    if (! isset($metadata)) {
        $metadata = metadata_fallback();
    }
@endphp

@if ($metadata)
    @if ($metadata['description'])
        <meta name="description" content="{{ $metadata['description'] }}">
    @endif

    {{-- Twitter Card data --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $metadata['title'] }}">
    @if ($metadata['description'])
        <meta name="twitter:description" content="{{ $metadata['description'] }}">
    @endif
    <meta name="twitter:site" content="@dosomething">
    <meta name="twitter:creator" content="@dosomething">
    <meta name="twitter:image" content="{{ $metadata['image']['url'] }}">

    {{-- Open Graph data --}}
    <meta property="og:title" content="{{ $metadata['title'] }}" />
    <meta property="og:type" content="article" />
    @if ($metadata['description'])
        <meta property="og:description" content="{{ $metadata['description'] }}" />
    @endif
    <meta property="og:url" content="{{ $metadata['url'] }}" />
    <meta property="og:site_name" content="DoSomething.org" />
    <meta property="og:image" content="{{ $metadata['image']['url'] }}" />
    <meta property="og:image:width" content="{{ $metadata['image']['width'] }}" />
    <meta property="og:image:height" content="{{ $metadata['image']['height'] }}" />
    <meta property="fb:app_id" content="{{ $metadata['facebook_app_id'] }}" />
@endif
