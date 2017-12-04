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
     * Parse and extract data for action steps.
     *
     * @param  array $actionSteps
     * @return array
     */
    public function parseActionSteps($actionSteps)
    {
        return collect($actionSteps)->map(function ($step) {
            return new CampaignActionStep($step->entry);
        });
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
            return new Quiz($quiz->entry);
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
            'endDate' => $this->endDate,
            'callToAction' => $this->callToAction, //@TODO: deprecate in favor of tagline.
            'tagline' => $this->callToAction,
            'blurb' => $this->blurb,
            'coverImage' => [
                'description' => $this->coverImage ? $this->coverImage->getDescription() : '',
                'url' => get_image_url($this->coverImage),
                'landscapeUrl' => get_image_url($this->coverImage, 'landscape'),
            ],
            'affiliateSponsors' => $this->parseAffiliates($this->affiliateSponsors),
            'affiliatePartners' => $this->parseAffiliates($this->affiliatePartners),
            // @TODO: Why is it 'activity_feed' oy? ;/
            'activityFeed' => $this->parseActivityFeed(
                $this->activity_feed,
                array_get($this->additionalContent, 'reverseActivityFeedOrder', true)
            ),
            'actionSteps' => $this->parseActionSteps($this->actionSteps),
            'quizzes' => $this->parseQuizzes($this->quizzes),
            'dashboard' => $this->dashboard,
            'affirmation' => [
                'header' => $this->affirmation->header,
                'photo' => get_image_url($this->affirmation->photo, 'square'),
                'quote' => $this->affirmation->quote,
                'author' => $this->affirmation->author,
                'callToActionHeader' => $this->affirmation->callToActionHeader,
                'callToActionDescription'=> $this->affirmation->callToActionDescription,
            ],
            'pages' => $this->pages,
            'landingPage' => $this->landingPage ? new Page($this->landingPage->entry) : null,
            'socialOverride' => $this->socialOverride ? new SocialOverride($this->socialOverride->entry) : null,
            'additionalContent' => $this->additionalContent,
            'allowExperiments' => $this->campaignSettings ? $this->campaignSettings->allowExperiments : null,
        ];
    }
}
