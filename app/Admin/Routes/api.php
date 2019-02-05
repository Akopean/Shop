<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$namespacePrefix = '\\' . config('admin.controllers.namespace') . '\\';

//Route::post('auth/login', ['uses' => $namespacePrefix . 'AdminAuthController@login']);
/*
Route::group(['middleware' => 'jwt.refresh'], function () use($namespacePrefix) {
    Route::get('auth/refresh', $namespacePrefix . 'AdminAuthController@refresh');
});

Route::group(['middleware' => ['jwt.auth','isAdmin']], function () use($namespacePrefix) {
    //Login
    Route::get('auth/user', $namespacePrefix . 'AdminAuthController@user');
    Route::post('auth/logout', $namespacePrefix . 'AdminAuthController@logout');

    //Users
    //Route::apiResource('users', $namespacePrefix . 'UsersController');

});
*/
