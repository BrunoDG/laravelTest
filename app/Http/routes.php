<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

View::addExtension('html', 'php');

Route::get('/', function () {
    return view('index');
});

Route::get('/template/{template}', function ($template) {
  return view($template);
});

Route::group(['prefix' => 'api'], function(){
  Route::get('/product', 'ProductsController@index');
  Route::get('/product/{id}', 'ProductsController@show');
  Route::post('/product', 'ProductsController@store');
  Route::put('/product/{id}', 'ProductsController@update');
  Route::delete('/product/delete/{id}', 'ProductsController@destroy');
});
