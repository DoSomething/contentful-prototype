<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Repositories\NorthstarCampaignRepository;
use Huddle\Zendesk\Facades\Zendesk as ZendeskClient;

class Zendesk
{
    /**
     * Northstar Campaign repository instance.
     * @var NorthstarCampaignRepository
     */
    private $NorthstarCampaignRepository;

    /**
     * Zendesk constructor.
     *
     * @param NorthstarCampaignRepository $NorthstarCampaignRepository
     */
    public function __construct(NorthstarCampaignRepository $NorthstarCampaignRepository)
    {
        $this->NorthstarCampaignRepository = $NorthstarCampaignRepository;
    }

    /**
     * Create/Update a Zendesk User for this Northstar user and open a new
     * ticket for them with their submitted question.
     *
     * @param string  $campaignId
     * @param string  $campaignName
     * @param string  $question
     * @return string
     */
    public function createTicket($campaignId, $campaignName, $question)
    {
        $northstarId = auth()->id();

        Log::debug('[Phoenix] ZendeskTicketsController@store: Creating Zendesk ticket:', [
            'northstar_id' => $northstarId,
            'question' => Str::limit($question, 5000, '(...)'),
        ]);

        $zendeskUser = $this->createOrUpdateZendeskUser($northstarId);

        $questionSubject = 'Question about '.$campaignName;

        $zendeskTicketData = [
            'requester' => [
                'email' => data_get($zendeskUser, 'user.email'),
            ],
            'subject' => $questionSubject,
            'comment' => [
                'body' => $questionSubject.': '.$question,
            ],
            'group_id' => $this->getZendeskGroupIdFromCampaign($campaignId),
            // @TODO: Assign priority based on campaign's staff pick status.
            // 'priority' => 'normal',
            // @TODO: Append browser & ip address using env variable zendesk field IDs.
            // 'custom_fields' = [
            //      ['id' => 'browser...', 'value' => $request->userAgent()],
            //      ['id' => 'ip...', 'value' => $request->ip()],
            // ],
        ];

        return ZendeskClient::tickets()->create($zendeskTicketData);
    }

    /**
     * Fetch user email and display name from Northstar.
     *
     * @param string $northstarId
     * @return array
     */
    protected function getUserDataFromNorthstar($northstarId)
    {
        $user = gateway('northstar')->withToken(token())->get('v2/users/'.$northstarId, [
            'include' => 'email',
        ]);

        return [
            data_get($user, 'data.email'),
            data_get($user, 'data.display_name'),
        ];
    }

    /**
     * Fetch user details from Northstar and create or update a new Zendesk
     * user with custom profile fields.
     *
     * @param string $northstarId
     * @return array
     */
    protected function createOrUpdateZendeskUser($northstarId)
    {
        [$userEmail, $userName] = $this->getUserDataFromNorthstar($northstarId);

        return ZendeskClient::users()->createOrUpdate([
            'email' => $userEmail,
            'name' => $userName,
            // Custom user attributes:
            'user_fields' => [
                'profile_uid' => $northstarId,
                // User's Northstar profile URL:
                'profile_url' => config('services.northstar.url').'/users/'.$northstarId,
            ],
        ]);
    }

    /**
     * Fetch Campaign from Northstar and parse out its first cause name.
     *
     * @param string  $campaignId
     * @return string
     */
    protected function getFirstCampaignCauseName($campaignId)
    {
        $northstarCampaign = $this->NorthstarCampaignRepository->getCampaign($campaignId);
        $campaignCauses = data_get($northstarCampaign, 'data.cause_names', []);

        return array_shift($campaignCauses);
    }

    /**
     * Fetch Northstar Campaign's first cause name and use it to filter out
     * the corresponding Zendesk group ID.
     *
     * @param string  $campaignId
     * @return string
     */
    protected function getZendeskGroupIdFromCampaign($campaignId)
    {
        $firstCampaignCause = $this->getFirstCampaignCauseName($campaignId);

        $zendeskGroups = optional(
            remember('zendesk_groups', 15, function () use ($firstCampaignCause) {
                // Zendesk Search API: http://bit.ly/2TihwCC
                return ZendeskClient::search()->find('type:group name:".'.$firstCampaignCause.'"');
            })
        )->results;

        // Filter out the *exact* matching group. (The search API includes a more generous matching logic).
        $zendeskGroup = collect($zendeskGroups)->firstWhere('name', $firstCampaignCause);

        return optional($zendeskGroup)->id;
    }
}
