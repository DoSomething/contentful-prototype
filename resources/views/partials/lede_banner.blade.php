{{--
<header role="banner" class="header -hero" style="background-image: url('{{  get_image_url($campaign->coverImage, 'landscape') }}')">
    <div class="wrapper">
        <h1 class="header__title">{{ $campaign->title }}</h1>
        <p class="header__subtitle">{{ $campaign->callToAction }}</p>
    </div>
</header>
--}}

<header class="lede-banner">
    <div class="wrapper">
        <h1>{{ $campaign->title }}</h1>
        <h2>{{ $campaign->callToAction }}</h2>

        <div></div>

        @if (count($campaign->affiliateSponsors))
            <div>
                <span>powered by</span>
                @foreach ($campaign->affiliateSponsors as $sponsor)
                    <img src="{{ get_image_url($sponsor->logo, 'logo') }}" />
                @endforeach
            </div>
        @endif

        <div id="banner-signup"></div>
    </div>
    <div class="cover-image" style="background-image: url('{{ get_image_url($campaign->coverImage, 'square') }}')"></div>
</header>
