@extends('layouts.master')

@section('content')
    <header role="banner" class="header -hero">
        <div class="wrapper">
            <h1 class="header__title">Join this campaign</h1>
        </div>
    </header>

    <div class="container -padded">
        <div class="wrapper">

            <div class="container__block">
                <h1>Hey you!</h1>

                @if ($incentive === 'true')
                    <div class="message-callout -above-horizontal">
                        <div class="message-callout__copy">
                          <p>OMG, you could win $1,000,000!</p>
                        </div>
                      </div>
                @endif

                <br />
                <a class="button" href="/done">Do it!</a>
            </div>

        </div>
    </div>
@endsection
