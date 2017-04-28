@extends('layouts.master')

@section('content')
    <div class="container -padded">
        <div class="wrapper">
            @if(auth()->user() && auth()->user()->isStaff())
                <div class="container__block">
                    <h1>Campaigns</h1>
                    <p>Here's all the campaigns available on <strong>Phoenix Next</strong>, the new DoSomething.org
                        web experience.</p>
                </div>
                <ul class="gallery -quartet">
                    @foreach($campaigns as $item)
                        <li>
                            <article class="tile">
                                <a class="wrapper" href="{{ url('campaigns/'.$item->slug) }}">
                                    <div class="tile__meta">
                                        <h1 class="tile__title">{{ $item->title }}</h1>
                                        <p class="tile__tagline">{{ $item->callToAction }}</p>
                                    </div>
                                    <img alt="kitten overlords" src="{{ get_image_url($item->coverImage, 'square') }}" />
                                </a>
                            </article>
                        </li>
                    @endforeach
                </ul>
            @else
                <div class="container__block">
                    <h1>Permission Denied</h1>
                    How'd you get here? This is only for staff members.
                </div>
            @endif
        </div>
    </div>
@stop
