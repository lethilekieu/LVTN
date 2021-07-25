<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductType;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class ProductTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductType::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $valid = Validator::make($request->all(),
            [
                'product_type_name' => 'required|min:3',
                'meta_keywords' => 'required|min:3',
                'product_type_slug'=>'required|unique:product_type,product_type_slug',
                'product_type_desc' => 'required'
            ],
            [
                'product_type_name.required' => 'Phải nhập tên loại',
                'product_type_name.min' => 'Nhập ít nhất 3 ký tự',
                'meta_keywords.required' => 'Phải nhập meta key words',
                'meta_keywords.min' => 'Nhập ít nhất 3 ký tự',
                'product_type_slug.required'=>'Phải nhập tên slug',
                'product_type_slug.unique' =>'Tên slug phải là duy nhất',
                'product_type_desc.required' => 'Mô tả không được trống'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        return ProductType::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ProductType::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product_type = ProductType::findOrFail($id);
        $valid = Validator::make($request->all(),
            [
                'product_type_name' => 'required|min:3',
                'meta_keywords' => 'required|min:3',
                'product_type_slug'=>'required',
                'product_type_desc' => 'required'
            ],
            [
                'product_type_name.required' => 'Phải nhập tên loại',
                'product_type_name.min' => 'Nhập ít nhất 3 ký tự',
                'meta_keywords.required' => 'Phải nhập meta key words',
                'meta_keywords.min' => 'Nhập ít nhất 3 ký tự',
                'product_type_slug.required'=>'Phải nhập tên slug',
                'product_type_desc.required' => 'Mô tả không được trống'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        return $product_type->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product_type = ProductType::findOrFail($id);
        $count_products = $product_type->product->count();
        if($count_products != 0){
            return response()->json('Loại có sản phẩm tồn tại!', 400);
        }

        return $product_type->delete();
    }
    public function getnameProductType($id){
         return ProductType::where('categories_id', $id)->get();
    }
}
