<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Huddle\Zendesk\Facades\Zendesk;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Repositories\RogueCampaignRepository;

class ZendeskTicketsController extends Controller
{
    /**
     * Rogue Campaign repository instance.
     *
     * @var RogueCampaignRepository
     */
    private $rogueCampaignRepository;

    /**
     * ZendeskController constructor.
     *
     * @param RogueCampaignRepository $rogueCampaignRepository
     */
    public function __construct(RogueCampaignRepository $rogueCampaignRepository)
    {
        $this->middleware('auth:api');
        $this->middleware('throttle:10,60');

        $this->rogueCampaignRepository = $rogueCampaignRepository;
    }

    public function store(Request $request)
    {
        $request->validate([
            'campaign_id' => 'required|string',
            'campaign_name' => 'required|string',
            'question' => 'required|string',
        ]);

        $campaignName = $request->campaign_name;
        $question = $request->question;

        $rogueCampaign = $this->rogueCampaignRepository->getCampaign($request->campaign_id);
        $campaignCause = data_get($rogueCampaign, 'data.cause_names', [])[0];

        $northstarId = auth()->id();

        // Fetch user details from Northstar:
        $user = gateway('northstar')->withToken(token())->get('v2/users/'.$northstarId, [
            'include' => 'email',
        ]);

        $userEmail = data_get($user, 'data.email');
        $userName = data_get($user, 'data.display_name');

        Log::debug('[Phoenix] ZendeskTicketsController@store: Creating Zendesk ticket:', [
            'northstar_id' => $northstarId,
            'question' => str_limit($question, 5000, '(...)'),
        ]);

        $zendeskGroups = Zendesk::groups()->findAll();
        // Find the Zendesk group whose name matches the Campaign's first cause name.
        $zendeskGroup = collect($zendeskGroups->groups)->firstWhere('name', $campaignCause);
        $zendeskGroupId = optional($zendeskGroup)->id;

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
            'group_id' => $zendeskGroupId,
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
