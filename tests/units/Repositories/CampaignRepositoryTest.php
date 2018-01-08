<?php

use App\Repositories\CampaignRepository;

class CampaignRepositoryTest extends TestCase
{
    // @TODO: rewrite or review!
    // /** @test */
    // public function can_get_all_campaigns()
    // {
    //     // @TODO: set up a mock campaign!
    //     $campaign = $this->app->make(CampaignRepository::class);
    //     $campaigns = $campaign->getAll();

    //     $this->assertNotCount(0, $campaigns);
    // }

    /** @test */
    public function can_get_a_campaign_by_slug()
    {
        // @TODO: set up a mock campaign!
        $campaign = app(CampaignRepository::class)->findBySlug('test-teens-for-jeans');

        $this->assertEquals('[Test] Teens for Jeans', $campaign->title);
    }
}
