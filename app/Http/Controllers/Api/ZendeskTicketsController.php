<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Huddle\Zendesk\Facades\Zendesk;
use App\Http\Controllers\Controller;

class ZendeskTicketsController extends Controller
{
    /**
     * ZendeskController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Request $request)
    {
        $request->validate([
            'campaign_name' => 'required|string',
            'question' => 'required|string',
        ]);

        $campaignName = $request->campaign_name;
        $question = $request->question;

        $user = gateway('northstar')->withToken(token())->get('v1/profile');

        $northstarId = data_get($user, 'data.id');
        $userEmail = data_get($user, 'data.email');
        $userName = data_get($user, 'data.display_name');

        $zendeskUser = Zendesk::users()->createOrUpdate([
            'email' => $userEmail,
            'name' => $userName,
            // Custom user attributes:
            'user_fields' => [
                'profile_uid' => $northstarId,
                // User's Rogue profile URL:
                'profile_url' => config('services.rogue.url').'/users/'.$northstarId,
            ],
        ]);

        $questionSubject = 'Question about '.$campaignName;

        $zendeskTicketData = [
            'requester' => [
                'email' => $userEmail,
            ],
            'subject' => $questionSubject,
            'comment' => [
                'body' => $questionSubject.': '.$question,
            ],
            // @TODO: Assign priority based on campaign's staff pick status.
            // 'priority' => 'normal',
            // @TODO: Append browser & ip address using env variable zendesk field IDs.
            // 'custom_fields' = [
            //      ['id' => 'browser...', 'value' => $request->userAgent()],
            //      ['id' => 'ip...', 'value' => $request->ip()],
            // ],
        ];

        $ticket = Zendesk::tickets()->create($zendeskTicketData);

        return response()->json([
            'zendesk_ticket' => $ticket,
            'zendesk_user' => $zendeskUser,
        ]);
    }
}
