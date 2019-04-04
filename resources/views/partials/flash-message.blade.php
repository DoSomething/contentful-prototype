<div id="flash-message" class="flash-message {{session('flash_message')['class'] ?? ''}} is-visible">
    <div class="wrapper base-16-grid">
        <p class="flash-content">
            <em>{{ session('flash_message')['text'] }}</em>
        </p>
    </div>

    <button id="js-flash-message-close" class="flash-message-close">@include('svg.close-icon', ['class' => 'icon icon-close'])</button>
</div>
