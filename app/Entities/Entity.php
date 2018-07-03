<?php

namespace App\Entities;

use ArrayAccess;
use JsonSerializable;
use InvalidArgumentException;
use Contentful\Delivery\Asset;
use Contentful\Delivery\DynamicEntry;

/**
 * A convenience wrapper for Contentful's DynamicEntity.
 */
class Entity implements ArrayAccess, JsonSerializable
{
    /**
     * The Contentful entry.
     *
     * @var \Contentful\Delivery\DynamicEntry
     */
    protected $entry;

    /**
     * Create instance of the Campaign class.
     *
     * @param \Contentful\Delivery\DynamicEntry $entry
     */
    public function __construct(DynamicEntry $entry)
    {
        $this->entry = $entry;

        $this->entry->setLocale(app()->getLocale());
    }

    /**
     * Parse and extract data for blocks.
     *
     * @param  array $blocks
     * @return array
     */
    public function parseBlocks($blocks)
    {
        return collect($blocks)->map(function ($block) {
            return $this->parseBlock($block);
        })->values();
    }

    /**
     * Parse and extract data for a block.
     *
     * @param  Entry $step
     * @return array
     */
    public function parseBlock($block)
    {
        if (empty($block)) {
            return null;
        }

        switch ($block->getContentType()) {
            case 'affirmation':
                return new Affirmation($block->entry);
            case 'callToAction':
                return new CallToAction($block->entry);
            case 'campaignUpdate':
                return new CampaignUpdate($block->entry);
            case 'contentBlock':
                return new ContentBlock($block->entry);
            case 'customBlock':
                if ($block->entry->getType() === 'join_cta') {
                    return new CallToAction($block->entry);
                }

                if ($block->entry->getType() === 'campaign_update') {
                    return new CampaignUpdate($block->entry);
                }

                return new CustomBlock($block->entry);
            case 'imagesBlock':
                return new ImagesBlock($block->entry);
            case 'linkAction':
                return new LinkAction($block->entry);
            case 'page':
                return new Page($block->entry);
            case 'photoSubmissionAction':
                return new PhotoSubmissionAction($block->entry);
            case 'quiz':
                return new Quiz($block->entry);
            case 'referralSubmissionAction':
                return new ReferralSubmissionAction($block->entry);
            case 'shareAction':
                return new ShareAction($block->entry);
            case 'socialDriveAction':
                return new SocialDriveAction($block->entry);
            case 'textSubmissionAction':
                return new TextSubmissionAction($block->entry);
            case 'voterRegistrationAction':
                return new VoterRegistrationAction($block->entry);
            default:
                return $block->entry;
        }
    }

    /**
     * Dynamically access the campaign's attributes.
     *
     * @param  string $property
     * @return mixed
     */
    public function __get($property)
    {
        if (! $this->offsetExists($property)) {
            return null;
        }

        // @see: DynamicEntry's __call implementation.
        try {
            $value = $this->entry->{'get'.ucwords($property)}();
        } catch (\Contentful\Exception\NotFoundException $error) {
            // If the linked resource is not published, return null.
            $value = null;
        } catch (\ErrorException $error) {
            // If trying to get a translation for a field that isn't
            // filled out, it'll throw ErrorException so we catch that.
            $value = null;
        }

        if ($value instanceof Asset) {
            return $value;
        }

        if ($value instanceof DynamicEntry) {
            return new self($value);
        }

        if (is_array($value)) {
            return collect($value)->map(function ($value) {
                if ($value instanceof DynamicEntry) {
                    return new self($value);
                } else {
                    return $value;
                }
            });
        }

        return $value;
    }

    /**
     * Get the ContentType for the DynamicEntry.
     *
     * @return string
     */
    public function getContentType()
    {
        return $this->entry->getContentType()->getId();
    }

    /**
     * Offset to retrieve
     * @link http://php.net/manual/en/arrayaccess.offsetget.php
     *
     * @param mixed $offset
     * @return mixed
     */
    public function offsetGet($offset)
    {
        return $this->__get($offset);
    }

    /**
     * Whether a offset exists
     * @link http://php.net/manual/en/arrayaccess.offsetexists.php
     *
     * @param mixed $offset
     * @return bool
     */
    public function offsetExists($offset)
    {
        $fields = array_keys($this->entry->getContentType()->getFields());

        return in_array($offset, $fields);
    }

    /**
     * Offset to set.
     * @link http://php.net/manual/en/arrayaccess.offsetset.php
     *
     * @param mixed $offset
     * @param mixed $value
     * @return void
     */
    public function offsetSet($offset, $value)
    {
        throw new InvalidArgumentException;
    }

    /**
     * Offset to unset
     * @link http://php.net/manual/en/arrayaccess.offsetunset.php
     *
     * @param mixed $offset
     * @return void
     */
    public function offsetUnset($offset)
    {
        throw new InvalidArgumentException;
    }

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize()
    {
        $json = $this->entry->jsonSerialize();

        return (object) [
            'id' => $this->entry->getId(),
            'type' => $this->entry->getContentType()->getId(),
            'fields' => $json->fields,
        ];
    }
}
