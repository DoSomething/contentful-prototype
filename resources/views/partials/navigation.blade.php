<div class="navigation">
    <a class="navigation__logo" href="{{ url('/') }}"><span>DoSomething.org</span></a>
    <a  id="js-navigation-toggle" class="navigation__toggle"><span>Show Menu</span></a>
    <div class="navigation__menu">
        <ul class="navigation__primary">
            <li>
                <a href="{{ config('services.phoenix-legacy.url') . 'us/campaigns' }}">
                    <strong class="navigation__title">Explore Campaigns</strong>
                    <span class="navigation__subtitle">Find ways to take action both online and off.</span>
                </a>
            </li>
            <li>
                <a href="{{ config('services.phoenix-legacy.url') . 'us/about/who-we-are' }}">
                    <strong class="navigation__title">What is DoSomething.org?</strong>
                    <span class="navigation__subtitle">A global movement for good.</span>
                </a>
            </li>
        </ul>
        <ul class="navigation__secondary">
            <li class="navigation__dropdown">
                @if (Auth::user())
                    <a id="js-account-toggle" class="navigation__dropdown-toggle">My Profile</a>
                    <ul>
                        <li><a href="{{ config('services.phoenix-legacy.url') . 'northstar/' . Auth::user()->northstar_id }}">Profile</a></li>
                        <li><a href="{{ url('logout') }}" class="secondary-nav-item" id="link--logout">Log Out</a></li>
                    </ul>
                @else
                    <a href="{{ url('login') }}">Log In</a>
                @endif
            </li>
        </ul>
    </div>
</div>
