@extends('layouts.master')

@section('content')
    <div class="app bg-gray-100 min-h-full">

        <div id="nav-container"></div>

        <main role="main" class="pb-16 pt-6 relative">

            <article class="md:w-3/4 mx-auto">

                {{-- @TODO:css-grid Remove left padding once CSS Grid is implemented --}}
                <h1 class="mb-6 pl-3">Campaigns For All Causes</h1>

                @include('partials.campaign_gallery', ['campaigns' => $campaigns])

                <div class="pagination clearfix mt-3">
                    @if($previousPage > 0)
                        <a class="button -tertiary float-left clear-none" href="?page={{$previousPage}}">Previous</a>
                    @endif

                    @if($campaigns->count() >= $count)
                        <a class="button -tertiary float-right clear-none" href="?page={{$nextPage}}">Next</a>
                    @endif
                </div>

            </article>
        </main>

        @include('partials.footer')

    </div>
@stop
