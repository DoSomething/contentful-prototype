<?php

namespace App\Console\Commands;

use App\Models\Referral;
use Illuminate\Console\Command;

class ExportReferrals extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'referrals:export';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export the "referrals" table to a CSV file';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // @todo should only be querying for referrals that have not been exported before.
        $referrals = Referral::all();

        $referralChunks = $referrals->chunk($referrals->count() / 100);

        $bar = $this->output->createProgressBar(count($referralChunks));

        $file = fopen('referrals.csv', 'w');

        $columns = ['friend_name', 'friend_email', 'friend_story', 'referrer_northstar_id'];

        fputcsv($file, $columns);

        foreach ($referralChunks as $referralChunk) {
            foreach ($referralChunk as $referral) {
                fputcsv($file, [$referral->friend_name, $referral->friend_email, $referral->friend_story, $referral->referrer_northstar_id]);
            }

            $bar->advance();
        }

        fclose($file);

        $bar->finish();
    }
}
