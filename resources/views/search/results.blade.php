@extends('layouts.master')

@section('content')
    <div class="app bg-gray-100 min-h-full mx-auto my-0">

        <div id="nav-container"></div>

        <main role="main" class="pb-16 pt-6">

            <article class="md:w-3/4 mx-auto">

                {{-- @TODO:css-grid Remove horizontal padding once CSS Grid is implemented --}}
                <h1 class="text-xl md:text-2xl mb-6 px-3">Search</h1>

                @if(empty($campaigns))
                    {{-- @TODO:css-grid Remove horizontal padding once CSS Grid is implemented --}}
                    <h2 class="text-base text-gray-700 mb-6 px-3">We searched our site, but couldn't find what you were looking for. Try a new search or explore <a href="/us/campaigns">our full list of campaigns</a>.</h2>
                @endif

                {{-- @TODO:css-grid Remove horizontal padding once CSS Grid is implemented --}}
                <form class="flex mb-6 px-3 text-base lg:w-1/2" action="/us/search" method="GET" accept-charset="UTF-8">
                    <div class="border border-solid border-gray-400 flex-1 mr-3 relative rounded">
                        @include('svg.search-icon', [
                            'class' => 'absolute icon icon-search text-gray-400 fill-current m-3',
                            'style' => 'height: 18px; width: 18px; top: 3px;'
                        ])
                        <input class="border-none leading-none pl-10 text-input w-full" name="query" type="text" value="{{ $query }}">
                    </div>
                    <input class="btn" type="submit" value="Search">
                </form>

                @if(! empty($campaigns))
                    @include('partials.campaign_gallery', ['campaigns' => $campaigns])
                @endif

            </article>

        </main>

        @include('partials.footer')

    </div>
@stop
