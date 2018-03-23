<?php

namespace App\Entities;

use JsonSerializable;
use Contentful\Delivery\Asset;

/**
 * The Campaign entity.
 *
 * @property string $title
 * @property string $callToAction
 * @property Asset $coverImage
 * @property array $problemFact
 * @property array $solutionFact
 * @property array $solutionStatement
 * @property array $facts
 * @property string $faqs
 */
class Campaign extends Entity implements JsonSerializable
{
    /**
     * Fill with specified number of Reportback Post items.
     *
     * @param  \Contentful\Delivery\DynamicEntry $entry
     * @return array
     *
     * @todo Temporary reportback post item filler based on
     * desired layout display option. Eventually, we'll be
     * using a different system to fill in reportback post
     * items. May eventually use a ReportbackPost entity.
     */
    public function fillReportbackPosts($entry)
    {
        $posts = [];

        switch ($entry->getType()) {
            case 'one-third':
                $count = 1;
                break;

            case 'two-thirds':
                $count = 2;
                break;

            default:
                $count = 3;
        }

        for ($i = 0; $i < $count; $i++) {
            $posts[] = [
                'id' => str_random(22),
                'type' => 'reportbacks', // @TODO: reporbackPost?
                'fields' => [
                    'displayOptions' => 'one-third',
                ],
            ];
        }

        return $posts;
    }

    /**
     * Parse and extract activity feed item data based on content type.
     *
     * @param  array $activityItems
     * @return array
     */
    public function parseActivityFeed($activityItems, $reverseActivityFeedOrder = true)
    {
        $parsedActivityItems = collect($activityItems)->map(function ($item) {
            switch ($item->getContentType()) {
                case 'campaignUpdate':
                    return new CampaignUpdate($item->entry);

                case 'callToAction':
                    return new CallToAction($item->entry);

                case 'customBlock':
                    if ($item->entry->getType() === 'join_cta') {
                        return new CallToAction($item->entry);
                    }

                    if ($item->entry->getType() === 'campaign_update') {
                        return new CampaignUpdate($item->entry);
                    }

                    if ($item->entry->getType() === 'reportbacks') {
                        return  $this->fillReportbackPosts($item->entry);
                    }

                    return new CustomBlock($item->entry);

                default:
                    return $item;
            }
        });

        if ($reverseActivityFeedOrder) {
            $parsedActivityItems = $parsedActivityItems->reverse();
        }

        return $parsedActivityItems->flatten(1);
    }

    /**
     * Parse and extract data for quizzes.
     *
     * @param  array $quizzes
     * @return array
     */
    public function parseQuizzes($quizzes)
    {
        return collect($quizzes)->map(function ($quiz) {
            return new LegacyQuiz($quiz->entry);
        });
    }

    /**
     * Parse and extract data for affiliates (either affiliateSponser or affiliatePartner).
     *
     * @param  array $affiliates
     * @return array
     */
    public function parseAffiliates($affiliates)
    {
        return collect($affiliates)->map(function ($affiliate) {
            return new Affiliate($affiliate->entry);
        });
    }

    /**
     * Parse the campaign lead from other
     *
     * @param  DynamicEntry $campaignlead
     * @param  array $additionalContent
     * @return array
     */
    public function parseCampaignLead($campaignlead, $additionalContent)
    {
        if ($campaignlead) {
            return new Staff($campaignlead->entry);
        }

        $email = $additionalContent['campaignLead']['email'] ?? 'help@dosomething.org';
        $name = $additionalContent['campaignLead']['name'] ?? 'Us';

        return [
            'id' => str_random(22),
            'type' => 'staff',
            'fields' => [
                'email' => $email,
                'name' => $name,
                'jobTitle' => null,
                'avatar' => null,
            ],
        ];
    }

    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'legacyCampaignId' => $this->legacyCampaignId,
            'legacyCampaignRunId' => get_legacy_campaign_data($this->legacyCampaignId, 'campaign_runs.current.en.id'),
            'type' => $this->entry->getContentType()->getId(),
            'template' => $this->template->first() ?: 'mosaic',
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => null, // @TODO: calculate status based on the endDate!
            'endDate' => $this->endDate,
            'callToAction' => $this->callToAction, //@TODO: deprecate in favor of tagline.
            'tagline' => $this->callToAction,
            'blurb' => trim($this->blurb),
            'coverImage' => [
                'description' => $this->coverImage ? $this->coverImage->getDescription() : '',
                'url' => get_image_url($this->coverImage),
                'landscapeUrl' => get_image_url($this->coverImage, 'landscape'),
            ],
            'campaignLead' => $this->parseCampaignLead($this->campaignLead, $this->additionalContent),
            'affiliateSponsors' => $this->parseAffiliates($this->affiliateSponsors),
            'affiliatePartners' => $this->parseAffiliates($this->affiliatePartners),
            // @TODO: Why is it 'activity_feed' oy? ;/
            'activityFeed' => $this->parseActivityFeed(
                $this->activity_feed,
                array_get($this->additionalContent, 'reverseActivityFeedOrder', true)
            ),
            'actionSteps' => $this->parseBlocks($this->actionSteps),
            'quizzes' => $this->parseQuizzes($this->quizzes),
            'dashboard' => $this->dashboard,
            'affirmation' => $this->parseBlock($this->affirmation),
            'pages' => $this->parseBlocks($this->pages),
            'landingPage' => $this->landingPage ? new Page($this->landingPage->entry) : null,
            'socialOverride' => $this->socialOverride ? new SocialOverride($this->socialOverride->entry) : null,
            'additionalContent' => $this->additionalContent,
            'allowExperiments' => $this->campaignSettings ? $this->campaignSettings->allowExperiments : null,
            'actionText' => array_get($this->campaignSettings, 'actionText') ?: 'Join Us',
        ];
    }
}
