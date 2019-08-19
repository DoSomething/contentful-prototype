<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropReferralsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('referrals');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('referrals', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('friend_name');
            $table->string('friend_email');
            $table->text('friend_story');
            $table->string('referrer_northstar_id');
        });
    }
}
