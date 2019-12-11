<div id="admin-dashboard" class="admin-dashboard z-max">
    <div class="wrapper base-12-grid">
        <h1 class="admin-dashboard-title grid-full font-normal uppercase text-base text-gray-400 mb-6">
            <span>Admin Dashboard</span>
        </h1>

        <h2 class="font-normal grid-full mb-3 text-gray-900 uppercase">{{ $admin['page']['type'] }} Settings &amp; Data</h2>

        <section class="panel grid-full-1/2 mb-6">
            <div class="wrapper rounded bg-gray-300">
                <h1 class="panel-title font-normal text-lg mb-3">
                    @include('svg.cog-icon', ['class' => 'icon icon-cog inline align-baseline']) Configuration
                </h1>

                <ul>
                    <li class="mb-3">
                        @if ($admin['page']['type'] === 'Page Not Found')
                            <a class="icon-link font-normal" href="{{ $admin['page']['searchUrl'] }}" target="_blank">
                                @include('svg.search-icon', ['class' => 'icon icon-search inline align-baseline']) Search for this page on Contentful
                            </a>
                        @else
                            <a class="icon-link font-normal" href="{{ $admin['page']['editUrl'] }}" target="_blank">
                                @include('svg.edit-pencil-icon', ['class' => 'icon icon-edit-pencil inline align-baseline']) Edit this content on Contentful
                            </a>
                        @endif
                    </li>
                    <li class="mb-3">
                        @if($admin['page']['cacheUrl'])
                            <a class="icon-link font-normal" href="{{ $admin['page']['cacheUrl'] }}">
                                @include('svg.trash-icon', ['class' => 'icon icon-trash inline align-baseline']) Clear the cache for this page
                            </a>
                        @else
                            <em class="text-gray-600">Current page is not cached</em>
                        @endif
                    </li>
                </ul>
            </div>
        </section>

        <section class="panel grid-full-1/2">
            <div class="wrapper rounded bg-gray-300">
                <h1 class="panel-title font-normal text-lg mb-3">
                    @include('svg.chart-bar-icon', ['class' => 'icon icon-chart-bar inline align-baseline']) Metrics
                </h1>

                <p class="text-gray-600"><em>What's this? We're not sure yet, but let the tech team know if you have ideas!</em></p>
            </div>
        </section>
    </div>

    <a id="js-admin-dashboard-toggle" class="toggle">@include('svg.bug-icon', ['class' => 'icon icon-bug'])</a>
</div>
