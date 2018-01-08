<?php

namespace App\Services;

use App\Exceptions\InvalidFileUploadException;

class UploadedMedia
{
    /**
     * Store the uploaded file.
     *
     * @param  Illuminate\Http\UploadedFile  $media
     * @return string
     */
    public static function store($media)
    {
        if (! $media->isValid()) {
            throw new InvalidFileUploadException;
        }

        return '/uploads/'.$media->store('images', 'uploads');
    }

    /**
     * Delete the uploaded file.
     *
     * @param string $path
     */
    public static function delete($path)
    {
        app('files')->delete(public_path($path));
    }
}
