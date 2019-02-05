<?php

namespace App\Shop\Products\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'type' => 'products',
            'id' => (string)$this->id,
            'slug' => $this->slug,
            'attributes' => [
                'model' => $this->model,
                'slug' => $this->slug,
                'price' => $this->price,
                'description' => $this->description,
                'status' => $this->status,
                'created' => $this->created_at,
            ],
            'links' => [
                'self' => route('api.v1.shop.products.show', ['product' => $this->slug]),
            ],
        ];
    }
}
