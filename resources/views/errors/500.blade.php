@extends('layouts.master')

@section('content')
    <div class="app bg-gray-100 min-h-full">

        <div id="nav-container"></div>

        <main role="main" class="px-3 py-20 relative">

            {{-- @TODO:css-grid Remove horizontal padding once CSS Grid is implemented --}}
            <article class="max-w-xl mx-auto text-center px-3 leading-relaxed mb-8">
                <header class="mb-8">
                    <h2 class="text-purple-900 text-xl md:text-2xl mb-2">Something went wrong.</h2>

                    <h3 class="text-lg">We've noted the problem & will get it fixed soon!</h3>
                </header>

                <p class="mb-8">
                    Try doing the same thing again - it may work the second time! If not, we've already noted
                    the problem and our tech team will get it fixed as soon as possible!

                    You can also find ways to <a href="{{ url('/us/campaigns?utm_source=500') }}">Take Action</a>
                    and join a movement of 5 million young people making an impact in their communities.
                </p>

                {{-- @TODO:forge-removal Remove margin reset once Forge is removed. --}}
                <p class="text-sm text-gray-800 m-0">
                    If you continue to run into problems, contact our <a href="https://help.dosomething.org" class="font-semibold text-gray-800 hover:text-gray-400 underline">support squad</a>!
                </p>
            </article>

        </main>

        @include('partials.footer')

    </div>
@stop
