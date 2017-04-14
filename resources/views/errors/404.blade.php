@extends('layouts.takeover')

@section('content')
    <div class="chrome">
        <div class="wrapper">
            <a class="construction__logo" href="http://dosomething.org"></a>
            <section class="container -framed">
                <div class="wrapper">
                    <div class="container__block -centered">
                        <h2 class="heading -alpha">Page Not Found</h2>
                        <h3>We couldn't find what you were looking for. </h3>
                    </div>
                    <div class="container__block -centered">
                        <p>
                            We searched our site, but couldn't find what you were looking for. Try <a href="{{ url('/us/campaigns/sincerely-us') }}">Sincerely Us</a>, our campaign
                            to send letters of support to every Mosque in the United States, or <a href="{{ url('/') }}">our homepage</a>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
@stop
