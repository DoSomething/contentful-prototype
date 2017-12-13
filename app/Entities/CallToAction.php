<?php

namespace App\Entities;

use JsonSerializable;

class CallToAction extends Entity implements JsonSerializable
{
    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        switch ($this->getContentType()) {
            case 'callToAction':
                $type = $this->getContentType();
                $content = $this->content;
                $impactPrefix = $this->impactPrefix ?: null;
                $impactSuffix = $this->impactSuffix ?: null;
                $impactValue = $this->impactValue ?: null;
                break;

            case 'customBlock':
                $type = 'callToAction';
                $content = $this->title;
                $impactPrefix = $this->additionalContent['impactPrefix'] ?: null;
                $impactSuffix = $this->additionalContent['impactMessage'] ?: null;
                $impactValue = $this->additionalContent['impactNumber'] ?: null;
                break;
        }

        return [
            'id' => $this->entry->getId(),
            'type' => $type,
            'fields' => [
                'actionText' => $this->actionText,
                'content' => $content,
                'displayOptions' => $this->displayOptions->first(),
                'impactPrefix' => $impactPrefix,
                'impactSuffix' => $impactSuffix,
                'impactValue' => $impactValue,
                'photo' => $this->photo ?: null, // @TODO: potentially remove.
                'visualStyle' => $this->visualStyle ? $this->visualStyle->first() : 'light',
                'useCampaignCoverImage' => $this->useCampaignCoverImage ?: null, // @TODO: potentially remove.
                'useCampaignTagline' => $this->useCampaignTagline ?: false,
            ],
        ];
    }
}
