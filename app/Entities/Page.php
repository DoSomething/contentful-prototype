<?php

namespace App\Entities;

use JsonSerializable;

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

        if (ends_with(rtrim($this->slug, '/'), 'community')) {
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
                'slug' => $this->slug,
                'title' => $this->title,
                'subTitle' => $this->subTitle,
                'content' => $this->content,
                'sidebar' => $this->parseBlocks($this->sidebar),
                'blocks' => $this->parseBlocks($this->blocks),
                // @TODO: we want to eventually remove the need for hideFromNavigation field
                // in favor of always linking to pages referenced in the `pages` field.
                'hideFromNavigation' => $this->hideFromNavigation,
                'socialOverride' => $this->socialOverride ? new SocialOverride($this->socialOverride->entry) : null,
            ],
        ];
    }
}
