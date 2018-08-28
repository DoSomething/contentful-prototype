<?php

namespace App\Entities;

use JsonSerializable;
use Contentful\Delivery\Asset;

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
     * Parse and extract data for quizzes.
     *
     * @param  array $quizzes
     * @return array
     */
    public function parseQuizzes($quizzes)
    {
        return collect($quizzes)->map(function ($quiz) {
            switch ($quiz->getContentType()) {
                case 'quizBeta':
                    return new LegacyQuiz($quiz->entry);
                case 'quiz':
                    return new Quiz($quiz->entry);
            }
        });
    }

    /**
     * Parse and extract data for affiliates (either affiliateSponser or affiliatePartner).
     *
     * @param  array $affiliates
     * @return array
     */
    public function parseAffiliates($affiliates)
    {
        return collect($affiliates)->map(function ($affiliate) {
            return new Affiliate($affiliate->entry);
        });
    }

    /**
     * Parse the campaign lead from other
     *
     * @param  DynamicEntry $campaignlead
     * @param  array $additionalContent
     * @return array
     */
    public function parseCampaignLead($campaignlead, $additionalContent)
    {
        if ($campaignlead) {
            return new Staff($campaignlead->entry);
        }

        $email = $additionalContent['campaignLead']['email'] ?? 'help@dosomething.org';
        $name = $additionalContent['campaignLead']['name'] ?? 'Us';

        return [
            'id' => str_random(22),
            'type' => 'staff',
            'fields' => [
                'email' => $email,
                'name' => $name,
                'jobTitle' => null,
                'avatar' => null,
            ],
        ];
    }

    public function parseLandingPage($landingPage)
    {
        if (!$landingPage) {
            return null;
        }

        // dd($landingPage->entry->getContentType()->getId());

        if ($landingPage->entry->getContentType()->getId() === 'sixpackExperiment') {
            return new SixpackExperiment($landingPage->entry);
        }

        return Page($landingPage->entry);
    }

    /**
     * Parse the landing page for the campaign.
     *
     * @param  DynamicEntry $landingPage
     * @return array
     */
    public function parseLandingPage($landingPage)
    {
        if (! $landingPage) {
            return null;
        }

        if ($landingPage->getContentType() === 'sixpackExperiment') {
            return new SixpackExperiment($landingPage->entry);
        }

        // @TODO: remove once all landing pages use the LandingPage content type.
        if ($landingPage->getContentType() === 'page') {
            return new Page($landingPage->entry);
        }

        return new LandingPage($landingPage->entry);
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
            'legacyCampaignId' => $this->legacyCampaignId,
            'legacyCampaignRunId' => get_legacy_campaign_data($this->legacyCampaignId, 'campaign_runs.current.en.id'),
            'type' => $this->entry->getContentType()->getId(),
            'template' => $this->template->first() ?: 'mosaic',
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => null, // @TODO: calculate status based on the endDate!
            'endDate' => $this->endDate,
            'callToAction' => $this->callToAction, //@TODO: deprecate in favor of tagline.
            'tagline' => $this->callToAction,
            'blurb' => trim($this->blurb),
            'coverImage' => [
                'description' => $this->coverImage ? $this->coverImage->getDescription() : '',
                'url' => get_image_url($this->coverImage),
                'landscapeUrl' => get_image_url($this->coverImage, 'landscape'),
            ],
            'campaignLead' => $this->parseCampaignLead($this->campaignLead, $this->additionalContent),
            'affiliateSponsors' => $this->parseAffiliates($this->affiliateSponsors),
            'affiliatePartners' => $this->parseAffiliates($this->affiliatePartners),
            'quizzes' => $this->parseQuizzes($this->quizzes),
            'dashboard' => $this->dashboard,
            'affirmation' => $this->parseBlock($this->affirmation),
            'pages' => $this->parseBlocks($this->pages),
            'landingPage' => $this->parseLandingPage($this->landingPage),
            'socialOverride' => $this->socialOverride ? new SocialOverride($this->socialOverride->entry) : null,
            'additionalContent' => $this->additionalContent,
            'allowExperiments' => $this->campaignSettings ? $this->campaignSettings->allowExperiments : null,
            'actionText' => array_get($this->campaignSettings, 'actionText') ?: 'Join Us',
            'staffPick' => $this->staffPick,
            'cause' => $this->cause,
            'scholarshipAmount' => $this->scholarshipAmount,
        ];
    }
}
