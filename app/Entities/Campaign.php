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

    /**
     * Parse and extract photo data for action steps.
     *
     * @param  array $photos
     * @return array
     */
    public function parseActionStepPhotos($photos)
    {
        $output = [];

        foreach ($photos as $photo) {
            $output[] = get_image_url($photo, 'landscape');
        }

        return $output;
    }

    /**
     * Parse and extract data for action steps.
     *
     * @param  array $actionSteps
     * @return array
     */
    public function parseActionSteps($actionSteps)
    {
        $output = [];

        foreach ($actionSteps as $step) {
            $data = [];

            $data['title'] = $step->title;
            $data['displayOptions'] = $step->displayOptions->shift();

            $step->content ? $data['content'] = $step->content : null;
            $step->background ? $data['background'] = get_image_url($step->background, 'landscape') : null;
            $step->photos ? $data['photos'] = $this->parseActionStepPhotos($step->photos) : null;
            $step->type ? $data['type'] = $step->type->shift() : null;
            $step->customType ? $data['customType'] = $step->customType->shift() : null; // @TODO deprecate.
            $step->additionalContent ? $data['additionalContent'] = $step->additionalContent : null;

            $output[] = $data;
        }

        return $output;
    }

    public function jsonSerialize()
    {
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
            'actionSteps' => $this->parseActionSteps($this->actionSteps),
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
            'additionalContent' => $this->additionalContent,
        ];
    }
}
