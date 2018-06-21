<?php

namespace App\Entities;

use JsonSerializable;

class TruncatedCampaign extends Campaign implements JsonSerializable
{
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
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => null, // @TODO: calculate status based on the endDate!
            'endDate' => $this->endDate,
            'callToAction' => $this->callToAction, //@TODO: deprecate in favor of tagline.
            'tagline' => $this->callToAction,
            'coverImage' => [
                'description' => $this->coverImage ? $this->coverImage->getDescription() : '',
                'url' => get_image_url($this->coverImage),
                'landscapeUrl' => get_image_url($this->coverImage, 'landscape'),
            ],
            'actionText' => array_get($this->campaignSettings, 'actionText') ?: 'Join Us',
            'staffPick' => $this->staffPick,
            'cause' => $this->cause,
            'scholarshipAmount' => $this->scholarshipAmount,
            'additionalContent' => $this->additionalContent,
        ];
    }
}
