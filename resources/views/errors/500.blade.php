@extends('layouts.takeover')

@section('content')
    <div class="chrome">
        <div class="wrapper">
            <a class="construction__logo" href="http://dosomething.org"></a>
            <section class="container -framed">
                <div class="wrapper">
                    <div class="container__block -centered">
                        <h2 class="heading -alpha">Something went wrong.</h2>
                        <h3>We've noted the problem & will get it fixed soon!</h3>
                    </div>
                    <div class="container__block -centered">
                        <p>
                            Try returning to <a href="{{ url('/us/campaigns/sincerely-us') }}">Sincerely Us</a>, and
                            doing the same thing again - it may work the second time! If not, we've already noted
                            the problem and our tech team will get it fixed as soon as possible!
                        </p>
                        <p class="footnote">
                            If you continue to run into problems, contact our <a href="https://help.dosomething.org">support squad</a>!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
@stop
