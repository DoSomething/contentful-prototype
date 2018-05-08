<?php

namespace App\Entities;

use JsonSerializable;

class Page extends Entity implements JsonSerializable
{
    /**
     * Parse and extract data for the sidebar.
     *
     * @param  array $sidebarItems
     * @return array
     */
    public function parseSidebar($sidebarItems)
    {
        return collect($sidebarItems)->filter(function ($sidebarItem) {
            switch ($sidebarItem->getContentType()) {
                case 'callToAction':
                    return new CallToAction($sidebarItem->entry);

                case 'customBlock':
                    return new CustomBlock($sidebarItem->entry);
            }
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
            'type' => $this->getContentType(),
            'fields' => [
                'slug' => $this->slug,
                'title' => $this->title,
                'subTitle' => $this->subTitle,
                'content' => $this->content,
                'sidebar' => $this->parseSidebar($this->sidebar),
                'blocks' => $this->parseBlocks($this->blocks),
                // @TODO: we want to eventually remove the need for hideFromNavigation field
                // in favor of always linking to pages referenced in the `pages` field.
                'hideFromNavigation' => $this->hideFromNavigation,
            ],
        ];
    }
}
