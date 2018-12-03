<div class="navigation {{isset($legacyNavigation) ? '-white -floating' : 'bg-white'}}">
    <a class="navigation__logo" href="{{ url('/') }}"><span>DoSomething.org</span></a>
    <a  id="js-navigation-toggle" class="navigation__toggle"><span>Show Menu</span></a>
    <div class="navigation__menu">
        <ul class="navigation__primary">
            <li>
                <a href="{{ phoenixLink('us/campaigns') }}">
                    <strong class="navigation__title">Explore Campaigns</strong>
                    <span class="navigation__subtitle">Find ways to take action both online and off.</span>
                </a>
            </li>
            <li>
                <a href="{{ phoenixLink('us/about/who-we-are') }}">
                    <strong class="navigation__title">What is DoSomething.org?</strong>
                    <span class="navigation__subtitle">A global movement for good.</span>
                </a>
            </li>
        </ul>

        <div class="wrapper">
            @if (Auth::user())
                <a href="https://www.dosomething.vote/?r=campaignID:8017,campaignRunID:8022,source:web,source_details:nav" class="button" target="_blank">Register to Vote</a>
            @endif

            <ul class="navigation__secondary">
                <li class="navigation__dropdown">
                    @if (Auth::user())
                        <a id="js-account-toggle" class="navigation__dropdown-toggle">My Profile</a>
                        <ul>
                            <li><a href="{{ url('us/account/profile') }}">Profile</a></li>
                            <li><a href="{{ route('logout') }}" class="secondary-nav-item" id="link--logout">Log Out</a></li>
                        </ul>
                    @else
                        <a href="{{ route('login', isset($campaign) ? get_login_query($campaign) : null) }}">Log In</a>
                    @endif
                </li>
            </ul>
        </div>
    </div>
</div>
