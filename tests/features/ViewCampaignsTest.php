<?php

namespace Tests;

use App\Repositories\CampaignRepository;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class ViewCampaignsTest extends BrowserKitTestCase
{
    // Probably want some sort of mock or fake for these test,
    // since we ideally shouldn't be connecting to Contentful
    // to grab content for running tests.

    /** @test */
    public function user_can_view_a_list_of_campaigns()
    {
        $this->markTestIncomplete(
          'This test has not been implemented yet.'
        );

        // @TODO: use mock instead of requesting from Contentful.
        $this->visit('/campaigns');

        $this->seePageIs('/campaigns');
        $this->see('Campaigns');
    }

    /** @test */
    public function user_can_view_a_campaign()
    {
        $this->markTestIncomplete(
          'This test has not been implemented yet.'
        );

        // @TODO: use mock instead of requesting from Contentful.
        $this->visit('/campaigns/test-teens-for-jeans');

        $this->seePageIs('/us/campaigns/test-teens-for-jeans');
        $this->see('[Test] Teens for Jeans');
        $this->see('Let\'s collect another million jeans together.');
    }
}
