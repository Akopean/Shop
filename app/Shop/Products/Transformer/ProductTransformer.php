<?php
namespace App\Shop\Products\Transformer;

use App\Shop\Products\Product;
use League\Fractal\TransformerAbstract;

class ProductTransformer extends TransformerAbstract
{
    /**
     * Transform the product
     *
     * @param Product $product
     * @return array
     */
    public function transform(Product $product)
    {
        return [
            'id' => (int) $product->id,
            'model' => $product->model,
            'description' => $product->description
        ];
    }
}
