<?php

namespace App\Entities;

use Contentful\Delivery\Asset;
use JsonSerializable;

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
        return (object) [
            'id' => $this->entry->getId(),
            'type' => $this->entry->getContentType()->getId(),
            'title' => $this->title,
            'slug' => $this->slug,
            'legacyCampaignId' => $this->legacyCampaignId,
            'callToAction' => $this->callToAction,
            'coverImage' => [
                'description' => $this->coverImage->getDescription(),
                'url' => $this->coverImage->getFile()->getUrl(),
            ],
            // @TODO: Why is it 'activity_feed' oy? ;/
            'activityFeed' => $this->activity_feed,
            'actionSteps' => $this->actionSteps,
            'pages' => $this->pages,
            'additionalContent' => $this->additionalContent,
        ];
    }
}
