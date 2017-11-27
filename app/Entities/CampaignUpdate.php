<?php

namespace App\Entities;

use JsonSerializable;

class CampaignUpdate extends Entity implements JsonSerializable
{
    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        switch ($this->getContentType()) {
            case 'campaignUpdate':
                $type = $this->getContentType();
                $author = $this->author ? new Staff($this->author->entry) : null;
                $content = $this->content;
                $socialOverride = $this->socialOverride ? new SocialOverride($this->socialOverride->entry) : null;
                break;

            case 'customBlock':
                $type = 'campaignUpdate';
                $author = [
                    'id' => null,
                    'type' => 'staff',
                    'fields' => [
                        'name' => isset($this->additionalContent['author']) ? $this->additionalContent['author'] : null,
                        'jobTitle' => isset($this->additionalContent['jobTitle']) ? $this->additionalContent['jobTitle'] : null,
                        'avatar' => null,
                    ],
                ];
                $content = "## {$this->title}\n\n {$this->content}";
                $socialOverride = null;
                break;
        }

        return [
            'id' => $this->entry->getId(),
            'type' => $type,
            'fields' => [
                'author' => $author,
                'content' => $content,
                'displayOptions' => $this->displayOptions->first(),
                'link' => $this->link,
                'socialOverride' => $socialOverride,
            ],
        ];
    }
}
