@extends('layouts.master')

@section('content')
    <div id="nav-container"></div>

    <main role="main" class="py-20">

        {{-- @TODO:cssgrid Remove horizontal padding once CSS Grid is implemented --}}
        <article class="max-w-xl mx-auto text-center px-4 leading-relaxed mb-8">
            <header class="mb-8">
                <h2 class="text-purple-900 text-xl md:text-2xl mb-2">Something went wrong.</h2>

                <h3 class="text-lg">We've noted the problem & will get it fixed soon!</h3>
            </header>

            <p class="mb-8">
                Try doing the same thing again - it may work the second time! If not, we've already noted
                the problem and our tech team will get it fixed as soon as possible!

                You can also try <a href="{{ url('/us/campaigns/grab-mic?utm_source=500') }}">Grab the Mic</a>
                and join our movement to create the most civically active generation ever.
            </p>

            {{-- @TODO:forge-removal Remove margin reset once Forge is removed. --}}
            <p class="text-sm text-gray-800 m-0">
                If you continue to run into problems, contact our <a href="https://help.dosomething.org" class="font-semibold text-gray-800 hover:text-gray-400 underline">support squad</a>!
            </p>
        </article>

    </main>
@stop
