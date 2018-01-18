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
        $referralsEloquentBuilder = Referral::where('exported', false);

        $referrals = $referralsEloquentBuilder->get();

        $bar = $this->output->createProgressBar($referrals->count());

        $file = fopen('referrals.csv', 'w');

        $columns = ['id', 'created_at', 'friend_name', 'friend_email', 'friend_story', 'referrer_northstar_id'];

        fputcsv($file, $columns);

        foreach ($referrals as $referral) {
            fputcsv($file, [
                $referral->id,
                $referral->created_at,
                $referral->friend_name,
                $referral->friend_email,
                $referral->friend_story,
                $referral->referrer_northstar_id,
            ]);

            $bar->advance();
        }

        fclose($file);

        $referralsEloquentBuilder->update(['exported' => true]);

        $bar->finish();
    }
}
