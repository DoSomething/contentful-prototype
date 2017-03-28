<meta property="og:title" content="{{ $shareFields['title'] }}" />
<meta property="og:type"  content="article" />
<meta property="og:description" content="{{ $shareFields['callToAction'] }}" />


{{-- Exposing the URL in our current setup causes funky side effects because of redirect rules
     and Facebook seems capable of working without it. --}}
{{-- <meta property="og:url" content="https://dosomething.org/campaigns/{{ $campaign->slug }}" /> --}}

<meta property="og:image" content="{{ $shareFields['coverImage'] }}" />
