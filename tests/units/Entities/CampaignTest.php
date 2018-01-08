<?php

class CampaignTest extends TestCase
{
    /** @test */
    public function can_find_specified_campaign()
    {
        $campaign = $this->getCampaign('test-teens-for-jeans');

        $this->assertEquals('6LQzMvDNQcYQYwso8qSkQ8', $campaign->id);
    }
}
