<?php

namespace App\Entities;

use JsonSerializable;
use Illuminate\Support\Str;

class Page extends Entity implements JsonSerializable
{
    /**
     * Parse blocks, and reverse parsed blocks for community pages.
     *
     * @param  array $blocks
     * @return array
     */
    public function parseBlocks($blocks)
    {
        $parsedBlocks = parent::parseBlocks($blocks);

        if (Str::endsWith(rtrim($this->slug, '/'), 'community')) {
            return $parsedBlocks->reverse()->values();
        }

        return $parsedBlocks;
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
            'type' => $this->getContentType(),
            'fields' => [
                'internalTitle' => $this->internalTitle,
                'title' => $this->title,
                'subTitle' => $this->subTitle,
                'slug' => $this->slug,
                'metadata' => $this->metadata ? new Metadata($this->metadata->entry) : null,
                'authors' => $this->parseBlocks($this->authors),
                'coverImage' => [
                    'description' => $this->coverImage ? $this->coverImage->getDescription() : '',
                    'url' => get_image_url($this->coverImage),
                ],
                'content' => $this->content,
                'additionalContent' => $this->additionalContent,
                'blocks' => $this->parseBlocks($this->blocks),
                'displaySocialShare' => $this->displaySocialShare,
                // @TODO: we want to eventually remove the need for hideFromNavigation field
                // in favor of always linking to pages referenced in the `pages` field.
                'hideFromNavigation' => $this->hideFromNavigation,
            ],
        ];
    }
}
