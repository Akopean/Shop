<?php

//Route::get('/verification/{verification_code}', 'Api\\Auth\\VerificationController@verify');

Route::get('/{any}', ['uses' => 'SpaController@index'])
    ->where('any', '.*');

Route::get('/', ['uses' => 'SpaController@index'])
    ->where('any', '.*');

//need fix not exist reset_password route
/*
Route::get('reset_password/{token}', ['as' => 'password.reset', function($token)
{
}]);*/


