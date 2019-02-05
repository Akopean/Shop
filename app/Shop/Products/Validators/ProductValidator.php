<?php

namespace App\Shop\Products\Validators;

use \Prettus\Validator\LaravelValidator;

class ProductValidator extends LaravelValidator
{
    protected $rules = [
        'model' => 'required|min:2',
        'price' => 'required',
        //'date_available' => 'required|date',
    ];

}
