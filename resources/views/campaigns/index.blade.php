{{-- {{ dump([$nextPage, $previousPage]) }} --}}

@extends('layouts.master')

@section('content')
    <div class="container -padded">
        <div class="wrapper">
            <div class="container__block">
                <h1>Explore Campaigns</h1>
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

            <div class="pagination clearfix">
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
