@extends('layouts.master')

@section('content')
    <div id="nav-container"></div>
    <div class="container -padded">
        <div class="wrapper">
            <div class="container__block">
                <h1>Explore Campaigns</h1>
            </div>

            @include('partials.campaign_gallery', ['campaigns' => $campaigns])

            <div class="pagination clearfix margin-top-md">
                @if($previousPage > 0)
                    <a class="button -tertiary float-left clear-none" href="?page={{$previousPage}}">Previous</a>
                @endif

                @if($campaigns->count() >= $count)
                    <a class="button -tertiary float-right clear-none" href="?page={{$nextPage}}">Next</a>
                @endif
            </div>
        </div>
    </div>
@stop
