<?php

use App\Repositories\CampaignRepository;

abstract class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    use DatabaseSetup;

    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * Get an instance of the Campaign entity.
     *
     * @return \App\Entities\Campaign
     */
    protected function getCampaign($slug = 'test-teens-for-jeans')
    {
        return;

        // @TODO: set up a mock campaign!
        return app(CampaignRepository::class)->findBySlug($slug);
    }
}
