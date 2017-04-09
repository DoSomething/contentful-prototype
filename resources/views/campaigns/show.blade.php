@extends('layouts.master')

@section('content')

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
