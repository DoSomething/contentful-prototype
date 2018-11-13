<?php

namespace App\Http\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AuthController extends Controller
{
    /**
     * Where to redirect users after login, if their "intended"
     * destination can't be guessed.
     *
     * @var string
     */
    protected $redirectTo = '/campaigns';

    /**
     * Where to redirect users after logout.
     *
     * @var string
     */
    protected $redirectAfterLogout;

    /**
     * Make a new AuthController, inject dependencies,
     * and set middleware for this controller's methods.
     */
    public function __construct()
    {
        $this->redirectAfterLogout = config('services.phoenix-legacy.url');
    }

    /**
     * Handle a login request to the application.
     *
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return \Illuminate\Http\RedirectResponse
     */
    public function getLogin(ServerRequestInterface $request, ResponseInterface $response)
    {
        // Save the post-login redirect for when the user completes the flow: either to the intended
        // page (if logging in to view a page protected by the 'auth' middleware), or the previous
        // page (if the user clicked "Log In" in the top navigation).
        if (! array_has($request->getQueryParams(), 'code')) {
            $intended = session()->pull('url.intended', url()->previous());
            session(['login.intended' => $intended]);

            // If starting the login process, see if we have a "queued" action.
            $actionId = array_get($request->getQueryParams(), 'actionId');
            session()->flash('actionId', $actionId);
        }

        $options = [];
        $jsonOptions = array_get($request->getQueryParams(), 'jsonOptions');

        // Check if the JS added auth options.
        if ($jsonOptions) {
            $options = (array) json_decode($jsonOptions);
        }

        // As a backup check the Blade template.
        if (! $options) {
            $options = array_get($request->getQueryParams(), 'options') ?: [];
        }

        $destination = array_get($request->getQueryParams(), 'destination');
        $url = session('login.intended', $this->redirectTo);

        // Do we have an action ID in the session? If so, set it on to the destination URL.
        if (session('actionId')) {
            $url .= '?actionId=' . urlencode(session('actionId'));
        }

        return gateway('northstar')->authorize($request, $response, $url, $destination, $options);
    }

    /**
     * Handle a logout request to the application.
     *
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function getLogout(ResponseInterface $response)
    {
        return gateway('northstar')->logout($response, $this->redirectAfterLogout);
    }
}
