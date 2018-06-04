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
    public function text_caption_is_required_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'quantity' => '30',
            'file' => 'not-a-file-upload',
            'why_participated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('text');
    }

    /** @test */
    public function text_caption_must_be_4_characters_or_longer_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'text' => 'duh',
            'quantity' => '30',
            'file' => 'not-a-file-upload',
            'why_participated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('text');
    }

    /** @test */
    public function text_caption_must_be_60_characters_or_shorter_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'text' => 'This text caption is way longer than 60 characters and thus should fail!',
            'quantity' => '30',
            'file' => 'not-a-file-upload',
            'why_participated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('text');
    }

    /** @test */
    public function quantity_is_required_if_field_is_displayed_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'text' => 'Great text caption!',
            'file' => 'not-a-file-upload',
            'show_quantity' => '1',
            'why_participated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('quantity');
    }

    /** @test */
    public function quantity_must_be_a_valid_integer_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'text' => 'Great text caption!',
            'quantity' => 'not-an-integer',
            'file' => 'not-a-file-upload',
            'show_quantity' => '1',
            'why_participated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('quantity');
    }

    /** @test */
    public function quantity_must_be_a_whole_number_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'caption' => 'Great text caption!',
            'quantity' => '3.5',
            'file' => 'not-a-file-upload',
            'show_quantity' => '1',
            'why_participated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('quantity');
    }

    /** @test */
    public function quantity_must_be_at_least_1_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'caption' => 'Great text caption!',
            'quantity' => '0',
            'file' => 'not-a-file-upload',
            'show_quantity' => '1',
            'why_participated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('quantity');
    }

    /** @test */
    public function file_media_is_required_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'caption' => 'Great text caption!',
            'quantity' => '30',
            'why_participated' => 'Because testing is very important.',
        ]);

        $this->assertValidationError('file');
    }

    /** @test */
    public function file_media_must_be_a_valid_file_upload_to_submit_photo_post()
    {
        $this->markTestIncomplete('@TODO: Implement once we upgrade to Laravel 5.4.');

        $this->storePhotoPost([
            'type' => 'photo',
            'file' => 'not-a-file-upload',
        ]);

        $this->assertValidationError('file');
    }

    /** @test */
    public function file_media_must_be_a_valid_image_to_submit_photo_post()
    {
        $this->markTestIncomplete('@TODO: Implement once we upgrade to Laravel 5.4.');

        $this->storePhotoPost([
            'type' => 'photo',
            'file' => 'not-a-file-upload',
        ]);

        $this->assertValidationError('file');
    }

    /** @test */
    public function why_participated_is_required_to_submit_photo_post()
    {
        $this->storePhotoPost([
            'type' => 'photo',
            'caption' => 'Great text caption!',
            'quantity' => '30',
            'file' => 'not-a-file-upload',
        ]);

        $this->assertValidationError('why_participated');
    }

    /** @test */
    public function registered_user_can_submit_photo_post()
    {
        $this->markTestIncomplete('@TODO: Implement once we upgrade to Laravel 5.4.');

        $this->storePhotoPost([
            'type' => 'photo',
            'caption' => 'Great text caption!',
            'quantity' => '30',
            'file' => 'not-a-file-upload',
            'why_participated' => 'Because testing is very important.',
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
