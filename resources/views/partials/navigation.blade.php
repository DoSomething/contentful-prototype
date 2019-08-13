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
                    <a href="{{ route('login', array_merge(['mode' => 'login'], isset($campaign) ? get_login_query($campaign) : get_login_query())) }}">Log In</a>
                    <a href="{{ route('register', isset($campaign) ? get_login_query($campaign) : get_login_query())}}">Join Now</a>
                @endif
            </li>
        </ul>
    </div>
</div>

{{--
http://phoenix.test/next/login?
    destination=%5BTest%5D+Teens+for+Jeans
    &options%5Btitle%5D=%5BTest%5D+Teens+for+Jeans
    &options%5BcoverImage%5D=https%3A%2F%2Fimages.ctfassets.net%2F81iqaqpfd8fy%2F4k8rv5sN0kii0AoCawc6UQ%2Fc22c3c132d1bb43055b6bafc248fcea5%2Fvn7gpbosm9rx.jpg
    &options%5BcallToAction%5D=Let%27s+collect+another+million+jeans+TOGETHER.

http://phoenix.test/next/login?
    actionId=auth%3A1565286536853
    &options=%7B%22title%22%3A%22%5BTest%5D%20Teens%20for%20Jeans%22%2C%22callToAction%22%3A%22Let%27s%20collect%20another%20million%20jeans%20TOGETHER.%22%2C%22coverImage%22%3A%22https%3A%2F%2Fimages.ctfassets.net%2F81iqaqpfd8fy%2F4k8rv5sN0kii0AoCawc6UQ%2Fc22c3c132d1bb43055b6bafc248fcea5%2Fvn7gpbosm9rx.jpg%3Fw%3D800%26h%3D600%26fit%3Dfill%22%2C%22contentful_id%22%3A%226LQzMvDNQcYQYwso8qSkQ8%22%7D
--}}
