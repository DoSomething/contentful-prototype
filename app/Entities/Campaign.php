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
     * Return the state of the campaign.
     *
     * @return bool
     */
    public function isActive()
    {
        return $this->active;
    }

    public function jsonSerialize()
    {
        $actionSteps = [];
        foreach ($this->actionSteps as $step) {
            $photos = [];
            foreach ($step->photos as $photo) {
                $photos[] = get_image_url($photo, 'landscape');
            }

            $actionSteps[] = [
                'title' => $step->title,
                'content' => $step->content,
                'displayOptions' => $step->displayOptions,
                'background' => get_image_url($step->background, 'landscape'),
                'photos' => $photos,
                'customType' => $step->customType,
                'additionalContent' => $step->additionalContent,
            ];
        }

        return [
            'id' => $this->entry->getId(),
            'legacyCampaignId' => $this->legacyCampaignId,
            'legacyCampaignRunId' => get_legacy_campaign_data($this->legacyCampaignId, 'campaign_runs.current.en.id'),
            'type' => $this->entry->getContentType()->getId(),
            'title' => $this->title,
            'slug' => $this->slug,
            'endDate' => $this->endDate,
            'callToAction' => $this->callToAction,
            'blurb' => $this->blurb,
            'coverImage' => [
                'description' => $this->coverImage ? $this->coverImage->getDescription() : '',
                'url' => get_image_url($this->coverImage),
            ],
            'affiliateSponsors' => $this->affiliateSponsors,
            'affiliatePartners' => $this->affiliatePartners,
            // @TODO: Why is it 'activity_feed' oy? ;/
            'activityFeed' => $this->activity_feed,
            'actionSteps' => $actionSteps,
            'dashboard' => $this->dashboard,
            'affirmation' => [
                'header' => $this->affirmation->header,
                'photo' => get_image_url($this->affirmation->photo),
                'quote' => $this->affirmation->quote,
                'author' => $this->affirmation->author,
                'callToActionHeader' => $this->affirmation->callToActionHeader,
                'callToActionDescription'=> $this->affirmation->callToActionDescription,
            ],
            'pages' => $this->pages,
            'additionalContent' => $this->additionalContent,
        ];
    }
}
