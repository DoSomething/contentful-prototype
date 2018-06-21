<?php

namespace App\Exceptions;

use Exception;
use Contentful\Exception\NotFoundException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use DoSomething\Gateway\Exceptions\ValidationException as GatewayValidationException;

class Handler extends ExceptionHandler
{
    const PRODUCTION_ERROR_MESSAGE = 'Looks like something went wrong. We\'ve noted the problem and will try to get it fixed!';

    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        ValidationException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        // Re-cast to more appropriate exception.
        if ($exception instanceof ModelNotFoundException || $exception instanceof NotFoundException) {
            $exception = new NotFoundHttpException('That resource could not be found.');
        }

        if ($request->ajax() || $request->wantsJson()) {
            return $this->buildJsonResponse($request, $exception);
        }

        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return redirect()->guest(route('login'));
    }

    /**
     * Render an exception into an HTTP JSON response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    protected function buildJsonResponse($request, Exception $exception)
    {
        if ($exception instanceof HttpException) {
            $code = $exception->getStatusCode() ?: 500;
            $message = $exception->getMessage();
        } elseif ($exception instanceof ValidationException) {
            $code = 422;
            $message = 'Hmm, there were some issues with your submission.';
            $fields = $exception->validator->errors()->getMessages();
        } elseif ($exception instanceof GatewayValidationException) {
            $code = 422;
            $message = 'Hmm, there were some issues with your submission.';
            $fields = $exception->getErrors();
        } elseif ($exception instanceof AuthenticationException) {
            $code = 401;
            $message = $exception->getMessage();
        } else {
            $code = 500;
            $message = config('app.debug') ? $exception->getMessage() : self::PRODUCTION_ERROR_MESSAGE;
        }

        $response = [
            'error' => [
                'code' => $code,
                'message' =>$message,
            ],
        ];

        // Add fields messages if available.
        if (isset($fields)) {
            $response['error']['fields'] = $fields;
        }

        // Debug mode info.
        if (config('app.debug')) {
            $response['debug'] = [
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
            ];
        }

        return response()->json($response, $code);
    }
}
