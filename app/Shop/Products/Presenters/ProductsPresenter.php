<?php

namespace App\Shop\Products\Presenters;

use App\Shop\Products\Transformer\ProductTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ProductsPresenter.
 *
 * @package namespace App\Presenters\App\Shop;
 */
class ProductsPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new ProductTransformer();
    }
}
