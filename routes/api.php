<?php

/** AUTH ROUTE GROUP */
Route::group([
    'prefix' => 'auth',
    'namespace' => 'Api\\Auth',
    'as' => 'api.auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('facebook', 'AuthController@facebook');
    Route::post('signup', 'AuthController@signup');
    Route::post('recovery', 'ForgotPasswordController@sendResetEmail');
    Route::post('reset', 'ResetPasswordController@resetPassword');
    Route::get('refresh', 'AuthController@refresh')->middleware('jwt.refresh');

    Route::post('verify/{id}', 'VerificationController@verify')->name('.verification.verify');
    Route::post('resend', 'VerificationController@resend')->name('.verification.resend');

    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::post('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

/** API VERSION V1 */
Route::group([
    'prefix' => 'v1',
    'middleware' => ['api'],
    'as' => 'api.v1.',
    'limit' => 100,
    'expires' => 5,
    'namespace' => 'Api\\V1',
], function () {
    include 'api.v1.php';
});

