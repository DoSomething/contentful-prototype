<?php

use App\Exceptions\Handler;
use App\Repositories\CampaignRepository;
use DoSomething\Gateway\Testing\WithOAuthTokens;
use Illuminate\Contracts\Debug\ExceptionHandler;

abstract class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    use DatabaseSetup, WithOAuthTokens;

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
     * Helper method to assert validation errors based on error response structure.
     *
     * @param  string $field
     */
    protected function assertValidationError($field)
    {
        $this->assertResponseStatus(422);

        $this->assertArrayHasKey($field, $this->decodeResponseJson()['error']['fields']);
    }

    /**
     * Disable exception handling in Laravel acceptance tests when need more
     * verbose error information.
     * https://gist.github.com/adamwathan/c9752f61102dc056d157
     *
     * @return StdClass
     */
    protected function disableExceptionHandling()
    {
        $this->app->instance(ExceptionHandler::class, new class extends Handler {
            public function __construct() {}

            public function report(Exception $exception)
            {
                // no-op
            }

            public function render($request, Exception $exception) {
                throw $exception;
            }
        });
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
