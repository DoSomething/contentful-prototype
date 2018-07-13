<?php

namespace App\Http\Controllers;

class ProfileController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = auth()->user();

        if ($user) {
            return view('app');
        }

        return view('app');
        // return redirect('https://identity-qa.dosomething.org/login');
    }
}
