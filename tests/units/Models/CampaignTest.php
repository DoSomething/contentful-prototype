<?php

use App\Repositories\CampaignRepository;

class CampaignTest extends TestCase
{
    /** @test */
    public function can_get_all_campaigns()
    {
        // Setup a mock collection of campaigns!
        $repository = new CampaignRepository(true);
        $campaigns = $repository->getAll();

        $this->assertNotCount(0, $campaigns);
    }

    /** @test */
    public function can_get_a_campaign_by_slug()
    {
        // Set up a mock campaign!
        $repository = new CampaignRepository(true);
        $campaign = $repository->findBySlug('baby-its-cold-inside');

        $this->assertEquals('Baby, It\'s Cold Inside', $campaign->getTitle());
    }
}
