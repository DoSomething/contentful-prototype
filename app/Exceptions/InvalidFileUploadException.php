<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class InvalidFileUploadException extends HttpException
{
    /**
     * Make a new Invalid File Upload exception.
     */
    public function __construct()
    {
        parent::__construct(400, 'There were issues uploading the provided file.');
    }
}
