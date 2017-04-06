<div class="navigation -floating -white">
    <a class="navigation__logo" href="{{ url('/') }}"><span>DoSomething.org</span></a>
    <a  id="js-navigation-toggle" class="navigation__toggle"><span>Show Menu</span></a>
    <div class="navigation__menu">
        <ul class="navigation__primary">
            <li>
                <a href="{{ url('https://www.dosomething.org/us/campaigns') }}">
                    <strong class="navigation__title">Explore Campaigns</strong>
                    <span class="navigation__subtitle">Find ways to take action both online and off.</span>
                </a>
            </li>
            <li>
                <a href="{{ url('https://www.dosomething.org/us/about/who-we-are') }}">
                    <strong class="navigation__title">What is DoSomething.org?</strong>
                    <span class="navigation__subtitle">A global movement for good.</span>
                </a>
            </li>
        </ul>
        <ul class="navigation__secondary">
            <li>
                @if (Auth::user())
                    <a href="{{ url('logout') }}">Log Out</a>
                @else
                    <a href="{{ url('login') }}">Log In</a>
                @endif
            </li>
        </ul>
    </div>
</div>
