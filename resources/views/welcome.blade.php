@extends('layouts.master')

@section('content')
    <header role="banner" class="header">
        <div class="wrapper">
            <h1 class="header__title">Phoenix Next</h1>
            <p class="header__subtitle">The new web interface for DoSomething.org.</p>
        </div>
    </header>

    <div class="container -padded">
        <div class="wrapper">
            <div class="container__block -narrow">
                <p><strong>You're looking at the future of DoSomething.org campaigns.</strong> It's still a work-in-progress
                so not everything might work the way you expect! Check back frequently for updates!</p>
                <strong>CHOCOLATE</strong>
                <ul class="list">
                    <li><a href="/campaigns">Campaign Index</a></li>
                </ul>
            </div>
        </div>
    </div>
@stop
