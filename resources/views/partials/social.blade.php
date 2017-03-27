<meta property="og:title" content="{{ $campaign->title }}" />
<meta property="og:type"  content="article" />
<meta property="og:description" content="{{ $campaign->callToAction }}" />

{{-- Exposing the URL in our current setup causes funky side effects because of redirect rules
     and Facebook seems capable of working without it. --}}
{{-- <meta property="og:url" content="https://dosomething.org/campaigns/{{ $campaign->slug }}" /> --}}

{{-- Contentful outputs "//" which Facebook cannot parse --}}
<meta property="og:image" content="http:{{ $campaign->coverImage->getFile()->getUrl() }}" />
