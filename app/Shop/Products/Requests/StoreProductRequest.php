<?php

namespace App\Shop\Products\Requests;

use App\Shop\Products\Product;
use App\Shop\Products\Repositories\ProductRepository;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'model' => ['required','min:2', 'max:200', Rule::unique('shop_products')->ignore($this->segment(4))],
            'price' => 'required|numeric',
            'status' => [
                'required',
                'string',
                Rule::in(Product::getAvailableStates())
            ],
            // 'email' => 'required|email|unique:users,email',
        ];
    }
}
