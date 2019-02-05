<?php

namespace App\Shop\Products;

use Illuminate\Database\Eloquent\Model;


/**
 * Class Product
 * @package App\Shop\Products
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property mixed model
 * @property mixed description
 * @property mixed id
 * @property int price
 * @property int status
 */
class Product extends Model
{
    const PUBLISHED = 'Published';
    const DRAFT = 'Draft';
    const Pending = 'Pending';

    protected $table = "shop_products";

    protected $fillable = ['model', 'status', 'description', 'price', 'slug'];

    /**
     * @return array
     */
    static public function getAvailableStates()
    {
        return [
            self::PUBLISHED,
            self::DRAFT,
            self::Pending,
        ];
    }

    /**
     * @param $query
     * @param string $status
     * @return mixed
     * Product::status(Product::PUBLISHED)->get();
     */
    public function scopeStatus($query, string $status) {
        return $query->where('status', $status);
    }
}
