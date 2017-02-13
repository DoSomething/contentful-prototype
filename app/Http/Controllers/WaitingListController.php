<?php

namespace App\Http\Controllers;

use Request;
use Session;
use App\Models\WaitingListUser;

class WaitingListController extends Controller
{

    /**
     * Store a users email.
     *
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request) {
        $user = new WaitingListUser;
        $user->email = Request::input('email');
        $user->save();

        Session::flash('flash_message', 'Thanks! We\'ll let you know when we lauch.');

        return redirect('/');
    }

}
