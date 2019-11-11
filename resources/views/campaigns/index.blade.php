@extends('layouts.master')

@section('content')
    <div id="nav-container"></div>

    <main role="main" class="pb-16 pt-6">

        <article class="md:w-3/4 mx-auto">

            {{-- @TODO:cssgrid Remove left padding once CSS Grid is implemented --}}
            <h1 class="mb-6 pl-3">Explore Campaigns</h1>

            @include('partials.campaign_gallery', ['campaigns' => $campaigns])

            <div class="pagination clearfix margin-top-md">
                @if($previousPage > 0)
                    <a class="button -tertiary float-left clear-none" href="?page={{$previousPage}}">Previous</a>
                @endif

                @if($campaigns->count() >= $count)
                    <a class="button -tertiary float-right clear-none" href="?page={{$nextPage}}">Next</a>
                @endif
            </div>

        </article>
    </main>
@stop
