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
                $author = null;

                if ($this->author) {
                    $author = new Person($this->author->entry);
                }

                $type = $this->getContentType();
                $content = $this->content;
                $socialOverride = $this->socialOverride ? new SocialOverride($this->socialOverride->entry) : null;
                break;

            // @TODO (2018-08-30): We should aim to remove the old campaign update customBlocks.
            case 'customBlock':
                $type = 'campaignUpdate';
                $author = [
                    'id' => str_random(22),
                    'type' => 'person',
                    'fields' => [
                        'name' => isset($this->additionalContent['author']) ? $this->additionalContent['author'] : null,
                        'type' => 'staff',
                        'active' => true,
                        'jobTitle' => isset($this->additionalContent['jobTitle']) ? $this->additionalContent['jobTitle'] : null,
                        'email' => 'help@dosomething.org',
                        'photo' => null,
                        'alternatePhoto' => null,
                        'description' => null,
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
                'affiliateLogo' => get_image_url($this->affiliateLogo, 'logo'),
                'content' => $content,
                'displayOptions' => $this->displayOptions->first(),
                'link' => $this->link,
                'socialOverride' => $socialOverride,
            ],
        ];
    }
}
