@extends('layouts.master')

@section('content')

    <div id="app">
        <div class="feed-enclosure">
            <div class="flex wrapper">
                    <div class="flex__cell">
                        <div class="placeholder -full">
                            <div class="spinner"></div>
                        </div>
                    </div>
            </div>
        </div>
    </div>

    @push('scripts')
      @include('partials.typeform_script')
    @endpush
@endsection
