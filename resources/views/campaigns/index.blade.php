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
                                <a class="wrapper" href="{{ url('us/campaigns/'.$item->slug) }}">
                                    <div class="tile__meta">
                                        <h1 class="tile__title">{{ $item->title }}</h1>
                                    </div>
                                    @if ($item->coverImage)
                                        <img alt="{{ $item->title }}" src="{{ $item->coverImage->url }}?w=400&h=400&fit=fill" />
                                    @else
                                        <img alt="No cover image!" src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" />
                                    @endif
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
