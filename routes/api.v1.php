<?php


/** SHOP ROUTE GROUP */
Route::group([
    'namespace' => 'Shop',
    'prefix' => 'shop',
    'as' => 'shop.',
], function () {
    /** PRODUCTS ROUTE GROUP */
    Route::group([
        'namespace' => 'Products',
    ], function () {
        Route::get('products/search', 'ProductController@getSearch');
        Route::apiResource('products', 'ProductController');
    });
    /** CUSTOMER ROUTE GROUP */
    /*   Route::group([
           'namespace' => 'Customers',
       ], function () {
           Route::get('customer/search', 'CustomerController@getSearch');
           Route::apiResource('customers', 'CustomerController');
       });*/
});
