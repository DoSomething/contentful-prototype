<?php

namespace Tests\Unit\Repositories;

use App\Repositories\CampaignRepository;

class CampaignRepositoryTest extends TestCase
{
    /** @test */
    public function can_get_all_campaigns()
    {
        $this->markTestIncomplete(
          'This test has not been implemented yet.'
        );

        // @TODO: use mock instead of requesting from Contentful.
        $campaign = $this->app->make(CampaignRepository::class);
        $campaigns = $campaign->getAll();

        $this->assertNotCount(0, $campaigns);
    }

    /** @test */
    public function can_get_a_campaign_by_slug()
    {
        $this->markTestIncomplete(
          'This test has not been implemented yet.'
        );

        // @TODO: use mock instead of requesting from Contentful.
        $campaign = app(CampaignRepository::class)->findBySlug('test-teens-for-jeans');

        $this->assertEquals('[Test] Teens for Jeans', $campaign->title);
    }
}
