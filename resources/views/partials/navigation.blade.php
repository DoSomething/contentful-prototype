<div class="navigation -floating -white">
    <a class="navigation__logo" href="{{ url('/') }}"><span>DoSomething.org</span></a>
    <a class="navigation__toggle js-navigation-toggle" href="#"><span>Show Menu</span></a>
    <div class="navigation__menu">
        <ul class="navigation__primary">
            <li>
                <a href="{{ url('campaigns') }}">
                    <strong class="navigation__title">Explore Campaigns</strong>
                    <span class="navigation__subtitle">Find ways to take action both online and off.</span>
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
