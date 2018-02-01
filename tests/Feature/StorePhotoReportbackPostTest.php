<?php

namespace Tests\Feature;

use Tests\BrowserKitTestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class StorePhotoReportbackPostTest extends BrowserKitTestCase
{
    protected function setUp()
    {
        parent::setUp();

        $this->campaignId = 'XYZStringID123'; // @TODO temp
    }

    /**
     * Helper method to make JSON API call to store photo post.
     *
     * @param  array $params
     */
    private function storePhotoPost($params)
    {
        $this->withStandardAccessToken()->json('POST', "/api/v2/campaigns/{$this->campaignId}/posts", $params);
    }

    /** @test */
    public function caption_is_required_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'impact' => '30',
            'media' => 'not-a-file-upload',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('caption');
    }

    /** @test */
    public function caption_must_be_4_characters_or_longer_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'caption' => 'duh',
            'impact' => '30',
            'media' => 'not-a-file-upload',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('caption');
    }

    /** @test */
    public function caption_must_be_60_characters_or_shorter_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'caption' => 'This caption is way longer than 60 characters and thus should fail!',
            'impact' => '30',
            'media' => 'not-a-file-upload',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('caption');
    }

    /** @test */
    public function impact_is_required_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'caption' => 'Great caption!',
            'media' => 'not-a-file-upload',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('impact');
    }

    /** @test */
    public function impact_must_be_a_valid_integer_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'caption' => 'Great caption!',
            'impact' => 'not-an-integer',
            'media' => 'not-a-file-upload',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('impact');
    }

    /** @test */
    public function impact_must_be_a_whole_number_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'caption' => 'Great caption!',
            'impact' => '3.5',
            'media' => 'not-a-file-upload',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('impact');
    }

    /** @test */
    public function impact_must_be_at_least_1_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'caption' => 'Great caption!',
            'impact' => '0',
            'media' => 'not-a-file-upload',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('impact');
    }

    /** @test */
    public function media_is_required_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'caption' => 'Great caption!',
            'impact' => '30',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('media');
    }

    /** @test */
    public function media_must_be_a_valid_file_upload_to_submit_photo_post()
    {
        $this->markTestIncomplete('@TODO: Implement once we upgrade to Laravel 5.4.');

        $this->storePhotoPost([
            'media' => 'not-a-file-upload',
        ]);

        $this->assertValidationError('media');
    }

    /** @test */
    public function media_must_be_a_valid_image_to_submit_photo_post()
    {
        $this->markTestIncomplete('@TODO: Implement once we upgrade to Laravel 5.4.');

        $this->storePhotoPost([
            'media' => 'not-a-file-upload',
        ]);

        $this->assertValidationError('media');
    }

    /** @test */
    public function why_participated_is_required_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'caption' => 'Great caption!',
            'impact' => '30',
            'media' => 'not-a-file-upload',
        ]);

        $this->assertValidationError('whyParticipated');
    }

    /** @test */
    public function registered_user_can_submit_photo_post()
    {
        $this->markTestIncomplete('@TODO: Implement once we upgrade to Laravel 5.4.');

        $this->storePhotoPost([
            'caption' => 'Great caption!',
            'impact' => '30',
            'media' => 'not-a-file-upload',
            'whyParticipated' => 'Because testing is very important.',
        ]);

        $this->assertResponseStatus(201);

        $this->assertArrayHasKey('data', $this->decodeResponseJson());
    }

    /** @test */
    public function anonymous_user_cannot_submit_photo_post()
    {
        $this->json('POST', "/api/v2/campaigns/{$this->campaignId}/posts", []);

        $this->assertResponseStatus(401);
    }
}
