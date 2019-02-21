<?php

namespace App\Http\Controllers\Api;

use App\Entities\Entity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\QueriesContentful;

class BlocksController extends Controller
{
    use QueriesContentful;

    /**
     * Display the specified resource.
     *
     * @param  string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $block = $this->getEntryFromIdAsJson($id);

        return response()->json($block);
    }
}
