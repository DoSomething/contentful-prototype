<div id="admin-dashboard" class="admin-dashboard">
    <div class="wrapper base-16-grid">
        <section class="panel grid-1/2">
            <h1 class="panel-title text-m padding-bottom-sm margin-bottom-lg">{{ $admin['page']['type'] }} Settings</h1>
            <ul>
                <li class="margin-bottom-md">
                    <a class="color-white uppercase" href="{{ $admin['page']['editUrl'] }}" target="_blank">
                        @include('svg.edit-pencil-icon', ['class' => 'icon icon-edit-pencil']) Edit this page on Contentful
                    </a>
                </li>
                <li class="margin-bottom-md">
                    <a class="color-white uppercase" href="{{ $admin['page']['cacheUrl'] }}">
                        @include('svg.trash-icon', ['class' => 'icon icon-trash']) Clear the cache for this page
                    </a>
                </li>
            </ul>
        </section>

        <section class="panel grid-1/2">
            <h1 class="panel-title text-m padding-bottom-sm margin-bottom-lg">{{ $admin['page']['type'] }} Metrics</h1>
            <p><em>More to come...</em></p>
        </section>
    </div>

    <a id="js-admin-dashboard-toggle" class="toggle">@include('svg.bug-icon', ['class' => 'icon icon-bug'])</a>
</div>
