@extends('layouts.master')

@section('content')
    <div id="nav-container"></div>
    <div class="container -padded">
        <div class="wrapper">
            <div class="container__block">
                <h1>Search</h1>

                @if(empty($campaigns))
                    <h4 class="padding-vertical-lg">We searched our site, but couldn't find what you were looking for. Try a new search or explore <a href="/us/campaigns">our full list of campaigns</a>.</h4>
                @endif

                <form class="search-form" action="/us/search" method="GET" accept-charset="UTF-8">
                    <div class="form-actions -inline">
                        <li><input class="text-field -search" name="query" type="text" value="{{ $query }}"></li>
                        <li><input class="button" type="submit" value="Search"></li>
                    </div>
                </form>
            </div>

            @if(! empty($campaigns))
                @include('partials.campaign_gallery', ['campaigns' => $campaigns])
            @endif
        </div>
    </div>
@stop
