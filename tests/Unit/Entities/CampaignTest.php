<?php

namespace Tests\Unit\Entities;

use Tests\TestCase;

class CampaignTest extends TestCase
{
    /** @test */
    public function can_find_specified_campaign()
    {
        $this->markTestIncomplete(
          'This test has not been implemented yet.'
        );

        // @TODO: use mock instead of requesting from Contentful.
        $campaign = $this->getCampaign('test-teens-for-jeans');

        $this->assertEquals('6LQzMvDNQcYQYwso8qSkQ8', $campaign->id);
    }
}
