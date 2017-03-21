@extends('layouts.master')

@section('content')
    <header role="banner" class="header -hero" style="background-image: url('{{  get_image_url($campaign->coverImage, 'landscape') }}')">
        <div class="wrapper">
            <h1 class="header__title">{{ $campaign->title }}</h1>
            <p class="header__subtitle">{{ $campaign->callToAction }}</p>
        </div>
    </header>

    <div id="app">
        <div class="feed-enclosure">
            <div class="flex wrapper">
                @foreach ($campaign->activity_feed as $block)
                    <div class="flex__cell {{ $block->displayOptions->map(function($c) { return '-'.$c; })->implode(' ') }}">
                        <div class="block placeholder">
                            Loading…
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection
