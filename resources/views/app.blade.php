@extends('layouts.master')

@section('content')
    <div id="app">
        <div class="placeholder">
            {{--
                @TODO:forge-removal Unless server rendering React, will need
                a different solution for this spinner once Forge is removed.
            --}}
            <div class="spinner"></div>
        </div>
    </div>
@endsection
