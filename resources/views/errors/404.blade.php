@extends('layouts.master')

@section('content')
    <div id="nav-container"></div>

    <main role="main" class="py-20">

        <article class="card rounded bordered max-w-xl mx-auto mb-8">
            <header class="card__title">
                <h1>Not Found</h1>
            </header>

            <div class="markdown with-lists padded">
                <p>
                    <strong>We searched our site, but couldn't find what you were looking for.</strong>
                    Find ways you can <a href="{{ url('/us/campaigns?utm_source=404') }}">Take Action</a>
                    and join a movement of 5 million young people making an impact in their communities.
                </p>
                <p>
                    You can also try <a href="{{ url('/') }}">our homepage</a> or
                    <a href="https://help.dosomething.org/hc/en-us/articles/115016093488-Help-The-page-I-m-looking-for-says-Page-Not-Found-">
                    reach out</a> to us.
                </p>
            </div>
        </article>

    </main>
@stop
