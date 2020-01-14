@extends('layouts.master')

@section('content')
    <div id="app" class="app bg-gray-100 min-h-full my-0 mx-auto">
        <div class="placeholder flex h-screen items-center justify-center">
            {{--
                @TODO:forge-removal Unless server rendering React, will need
                a different solution for this spinner once Forge is removed.
            --}}
            <div class="spinner"></div>
        </div>
    </div>
@endsection
