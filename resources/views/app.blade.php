@extends('layouts.master')

@section('content')
    <div id="app" class="app bg-white min-h-full">
        <div class="placeholder flex h-screen items-center justify-center">
            {{--
                @TODO:forge-removal Unless server rendering React, will need
                a different solution for this spinner once Forge is removed.
            --}}
            <div class="spinner"></div>
        </div>
    </div>
@endsection
