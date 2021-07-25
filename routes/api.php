<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\CategoriesController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('categories/{id}', 'App\Http\Controllers\CategoriesController@show');
Route::resource('categories', 'App\Http\Controllers\CategoriesController');
// Route::Resource('categories-type-tu/{id}', 'App\Http\Controllers\CategoriesController@findProductType');

// Route::get('brand/find-id-by-slug/{slug}', 'App\Http\Controllers\BrandController@findIdBySlug');
Route::resource('brand', 'App\Http\Controllers\BrandController');

Route::resource('supplier', 'App\Http\Controllers\SupplierController');

Route::resource('receipt', 'App\Http\Controllers\ReceiptController');
// Route::put('receipt_upd_bill/{id}', 'App\Http\Controllers\ReceiptController@handle_updateBillTotal');

Route::resource('receipt-details', 'App\Http\Controllers\ReceiptDetailsController');

Route::resource('slide', 'App\Http\Controllers\SlideController');

Route::resource('Admin', 'App\Http\Controllers\AdminAccountController');
Route::post('Admin_login','App\Http\Controllers\AdminAccountController@login');

//Gọi hàm liên quan sản phẩm
Route::put('update-quantity-after-order/{id}', 'App\Http\Controllers\ProductController@updateQuantityAfterOrder');//cập nhật số lượng sau khi mua hàng
Route::get('product/find-id-by-slug/{slug}', 'App\Http\Controllers\ProductController@findIdBySlug');
Route::resource('product', 'App\Http\Controllers\ProductController');
Route::get('brand-product/{key}', 'App\Http\Controllers\ProductController@showProductBrand');
Route::get('product-type-product/{key}', 'App\Http\Controllers\ProductController@showProductType');
Route::get('product-size/', 'App\Http\Controllers\ProductController@index');
Route::get('product-size/{key}', 'App\Http\Controllers\ProductController@getProductSize');
Route::get('categories-product/{key}', 'App\Http\Controllers\ProductController@showProductCate');
Route::get('product-customer', 'App\Http\Controllers\ProductController@getPagination');

Route::resource('product-type', 'App\Http\Controllers\ProductTypeController');
Route::get('get-categories-producttype/{id}', 'App\Http\Controllers\ProductTypeController@getnameProductType');
// Route::Resource('product-type/{id}', 'App\Http\Controllers\ProductTypeController@show_type');

Route::resource('color', 'App\Http\Controllers\ColorController');

Route::get('get-color-details/{id}', 'App\Http\Controllers\ColorDetailsController@getColor');
Route::resource('color-details', 'App\Http\Controllers\ColorDetailsController');

Route::resource('size', 'App\Http\Controllers\SizeController');

Route::get('get-size-details/{id}', 'App\Http\Controllers\SizeDetailsController@getSize');
Route::resource('size-details', 'App\Http\Controllers\SizeDetailsController');

Route::resource('customer', 'App\Http\Controllers\CustomerController');
Route::post("login", "App\Http\Controllers\CustomerController@login");

//Search
Route::get('search/{key}', 'App\Http\Controllers\ProductController@Search');
Route::get('product-type-categories/{key}', 'App\Http\Controllers\ProductTypeController@showProductType');

//In Statement - Funds
Route::get('get-income-statement/{year}', 'App\Http\Controllers\TblOrderController@getIncomeStatementByMonth');//Doanh thu bán hàng - admin/home
Route::get('get-funds/{year}', 'App\Http\Controllers\ReceiptController@getFundsByMonth');//Vốn mua hàng
// Route::get('get-product-seller', 'App\Http\Controllers\OrderDetailsController@getProductSellerByMonth');//Mặt hàng bán được trong tháng
Route::post('get-total-product-by-month', 'App\Http\Controllers\TblOrderController@getTotalQuantityByMonth');//Tổng số lượng các mặt hàng bán trong tháng

Route::get('get-history-order/{id}', 'App\Http\Controllers\TblOrderController@getOrderByCustomerId');//Khách hàng xem lịch sử mua hàng 
Route::get('get-info-ship-by/{id}', 'App\Http\Controllers\TblOrderController@getInfoShipByShipID');//Hiển thị thông tin giao hàng của đơn đơn đặt hàng- ShowOrder
Route::put('tbl-order/{id}', 'App\Http\Controllers\TblOrderController@update');
Route::resource('tbl-order', 'App\Http\Controllers\TblOrderController');

Route::get('get-order-details-by/{id}', 'App\Http\Controllers\OrderDetailsController@getOrderDetailsByOrderID');//Hiển thị danh sách đơn hàng của đơn đặt hàng - ShowOrder
Route::resource('order-details', 'App\Http\Controllers\OrderDetailsController');

Route::resource('info-ship', 'App\Http\Controllers\InfoShipController');

//Điền địa chỉ - InfoShip
Route::resource('city', 'App\Http\Controllers\CityController');
Route::get('find-district/{id}', 'App\Http\Controllers\DistrictController@getDistrictByIdCity');
Route::resource('district', 'App\Http\Controllers\DistrictController');
Route::get('find-wards/{id}', 'App\Http\Controllers\WardsController@getWardsByIdDistrict');
Route::resource('wards', 'App\Http\Controllers\WardsController');

//Send Mail
Route::post('sendmail', 'App\Http\Controllers\SendMailController@sendMail');
