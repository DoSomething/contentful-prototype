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
        $queryParams = $request->getQueryParams();

        // Save the post-login redirect for when the user completes the flow: either to the intended
        // page (if logging in to view a page protected by the 'auth' middleware), or the previous
        // page (if the user clicked "Log In" in the top navigation).
        if (! array_has($queryParams, 'code')) {
            $intended = session()->pull('url.intended', url()->previous());

            session(['login.intended' => $intended]);

            // If starting the login process, see if we have a "queued" action.
            $actionId = array_get($queryParams, 'actionId');

            session()->flash('actionId', $actionId);
        }

        // Set options containing metadata for Northstar login.
        $options = array_get($queryParams, 'options', []);

        if (is_string($options)) {
            $options = (array) json_decode($options);
        }

        // Set destination metadata for Northstar login; defaults to "title" in $options or null.
        $destination = array_get($queryParams, 'destination', array_get($options, 'title'));

        $url = session('login.intended', $this->redirectTo);

        // If there is an actionId in the session, set it as a query param on to the intended URL.
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
