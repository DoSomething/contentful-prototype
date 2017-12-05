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
                'title' => $this->title,
                'content' => $this->content,
                'legacyContent' => array_get($this->additionalContent, 'pitchContent', null),
                'sidebar' => $this->parseSidebar($this->sidebar),
            ],
        ];
    }
}
