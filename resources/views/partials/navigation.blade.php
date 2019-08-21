@php
    // @TODO: temporary until we can universalize campaign, pages, story-page entities into
    // a single variable passed to the view.
    $entity = isset($campaign) ? $campaign : null;
@endphp

<div class="navigation {{isset($legacyNavigation) ? '-white -floating' : 'bg-white'}}">
    <a class="navigation__logo" href="{{ url('/') }}"><span>DoSomething.org</span></a>
    <a  id="js-navigation-toggle" class="navigation__toggle"><span>Show Menu</span></a>
    <div class="navigation__menu">
        <ul class="navigation__primary">
            <li>
                <a href="{{ config('app.url') }}/us/campaigns">
                    <strong class="navigation__title">Explore Campaigns</strong>
                    <span class="navigation__subtitle">Find ways to take action both online and off.</span>
                </a>
            </li>
            <li>
                <a href="{{ config('app.url') }}/us/about/who-we-are">
                    <strong class="navigation__title">What is DoSomething.org?</strong>
                    <span class="navigation__subtitle">A global movement for good.</span>
                </a>
            </li>
        </ul>


        <ul class="navigation__secondary">
            <li>
                <form class="form-search" action="/us/search" method="GET" accept-charset="UTF-8">
                    <li><input class="text-field -search" name="query" type="text"></li>
                </form>
            </li>

            <li class="navigation__dropdown">
                @if (Auth::user())
                    <a id="js-account-toggle" class="navigation__dropdown-toggle">My Profile</a>
                    <ul>
                        <li><a href="{{ url('us/account/profile') }}">Profile</a></li>
                        <li><a href="{{ route('logout') }}" class="secondary-nav-item" id="link--logout">Log Out</a></li>
                    </ul>
                @else
                    {{-- <a href="{{ route('authorize', array_merge(['mode' => 'login'], get_login_query($entity))) }}">Log In</a> --}}
                    <a href="{{ route('authorize', get_login_query($entity)) }}">Log In</a>
                @endif
            </li>
        </ul>
    </div>
</div>
