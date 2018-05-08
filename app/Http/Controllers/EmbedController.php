<?php

namespace App\Http\Controllers;

use Embed\Embed;
use Illuminate\Http\Request;
use Embed\Http\CurlDispatcher;
use Illuminate\Http\JsonResponse;

class EmbedController extends Controller
{
    /**
     * Get details for embedding a link.
     * GET /embed?url=<url>
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->validate($request, ['url' => 'required|url']);

        $url = $request->query('url');

        $dispatcher = new CurlDispatcher([
            CURLOPT_CONNECTTIMEOUT => 1,
            CURLOPT_TIMEOUT => 3,
        ]);

        $info = remember('embed.' . md5($url), 60, function () use ($url, $dispatcher) {
            try {
                return Embed::create($url, null, $dispatcher);
            } catch (\Exception $exception) {
                return 'Embed Request Unsuccessful. Error: '.$exception->getMessage();
            }
        });

        if (gettype($info) === 'string') {
            return [
                'type' => 'error',
                'provider' => [
                    'name' => parse_url($url)['host'],
                    'icon' => null,
                ],
                'title' => $url,
                'url' => $url,
                'description' => null,
            ];
        } else {
            return [
                'type' => $info->type,
                'provider' => [
                    'name' => $info->providerName,
                    'icon' => $info->providerIcon,
                ],
                'title' => $info->title,
                'description' => $info->description,
                'url' => $info->url,
                'image' => $info->image,
                'code' => $info->type === 'video' ? $info->code : null,
            ];
        }
    }

    /**
     * Always return JSON errors for this controller.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $errors
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function buildFailedValidationResponse(Request $request, array $errors)
    {
        return new JsonResponse($errors, 422);
    }
}
