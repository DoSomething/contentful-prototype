<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DFurnes\Environmentalist\ConfiguresApplication;

class SetupCommand extends Command
{
    use ConfiguresApplication;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'phoenix:setup {--reset}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Configure your app.';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->createEnvironmentFile($this->option('reset'));

        $this->section('Set Northstar environment variables', function () {
            $environments = [
                'http://northstar.dev' => 'http://aurora.dev',
                'https://northstar-qa.dosomething.org' => 'https://aurora-qa.dosomething.org',
                'https://northstar-thor.dosomething.org' => 'https://aurora-thor.dosomething.org',
            ];

            $this->chooseEnvironmentVariable('NORTHSTAR_URL', 'Choose a Northstar environment', array_keys($environments));

            $this->instruction('You can get these environment variables from Aurora\'s "Clients" page:');
            $this->instruction($environments[env('NORTHSTAR_URL')] . '/clients');

            $this->setEnvironmentVariable('NORTHSTAR_AUTHORIZATION_ID', 'Enter the OAuth Client ID');
            $this->setEnvironmentVariable('NORTHSTAR_AUTHORIZATION_SECRET', 'Enter the OAuth Client Secret');
        });

        $this->section('Set Contentful environment variables', function () {
            $this->setEnvironmentVariable('CONTENTFUL_SPACE_ID', 'Enter the Contentful Space ID');

            $this->instruction('You can get this API key from Contentful\'s "API" tab.');
            $this->instruction('If you need access, register an account & ask for an invite in #phoenix-next.');

            $this->setEnvironmentVariable('CONTENTFUL_CONTENT_DELIVERY_API_KEY', 'Enter the Contentful Delivery API Key');
        });

        $this->runCommand('key:generate', 'Creating application key');

        $this->runCommand('migrate', 'Running database migrations');
    }
}
