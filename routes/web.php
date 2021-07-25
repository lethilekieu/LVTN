<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoriesController;
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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/product_details/{id}', function () {
    return view('welcome');
});
// Route::get('/order-tracking/{id}', function () {
//     return view('welcome');
// });

// Admin
Route::get('/admin/', function () {
    return view('Admin.welcome');
});

Route::get('/admin/home', function () {
    return view('Admin.welcome');
});
