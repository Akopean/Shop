<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$namespacePrefix = '\\' . config('admin.controllers.namespace') . '\\';

Route::get('/{any}', ['uses' => $namespacePrefix . 'SpaController@index'])
    ->where('any', '.*');

Route::get('/', ['uses' => $namespacePrefix . 'SpaController@index'])
    ->where('any', '.*');