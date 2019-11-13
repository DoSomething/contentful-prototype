@extends('layouts.master')

@section('content')
    <div id="nav-container"></div>

    <main role="main" class="pb-16 pt-6">

        <article class="md:w-3/4 mx-auto">

            {{-- @TODO:css-grid Remove horizontal padding once CSS Grid is implemented --}}
            <h1 class="text-xl md:text-2xl mb-6 px-4">Search</h1>

            @if(empty($campaigns))
                {{-- @TODO:css-grid Remove horizontal padding once CSS Grid is implemented --}}
                <h2 class="text-base text-gray-900 mb-6 px-4">We searched our site, but couldn't find what you were looking for. Try a new search or explore <a href="/us/campaigns">our full list of campaigns</a>.</h2>
            @endif

            {{-- @TODO:css-grid Remove horizontal padding once CSS Grid is implemented --}}
            <form class="search-form mb-6 px-4" action="/us/search" method="GET" accept-charset="UTF-8">
                <div class="form-actions -inline">
                    <li><input class="text-field -search" name="query" type="text" value="{{ $query }}"></li>
                    <li><input class="button" type="submit" value="Search"></li>
                </div>
            </form>

            @if(! empty($campaigns))
                @include('partials.campaign_gallery', ['campaigns' => $campaigns])
            @endif

        </article>

    </main>
@stop
