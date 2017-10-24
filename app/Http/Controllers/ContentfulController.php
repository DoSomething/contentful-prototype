<?php

namespace App\Http\Controllers;

use Request;

class ContentfulController extends Controller
{
    public function webhook(Request $request)
    {
        // TODO:
        // Get the link for the given webhook, load campaigns with it.
        // Add the CampaignRepository to this class
        // Call getBySlug for each campaign with skipCache=true
    }
}
