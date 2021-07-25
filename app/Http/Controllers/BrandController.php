<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Brand::all();
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
                'brand_name'=>'required|min:4',
                'brand_slug'=>'required',
            ],
            [
                'brand_name.min'=>'Phải nhập đủ 4 ký tự',
                'brand_name.required' => 'Phải nhập tên',
                'brand_slug.required'=> 'Phải nhập slug'
            ]
        );

        // var_dump($valid->fails());
        // print_r($valid->errors());
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        return Brand::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    // public function findIdBySlug($slug)
    // {
    //     return brand::select('brand_id')->where('brand_slug',$slug)->first();//get url theo slug phía backend
    // }

    public function show($id)
    {
        return Brand::findOrFail($id);
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
        $brand = Brand::findOrFail($id);
        $valid = Validator::make($request->all(),
            [
                'brand_name'=>'required|min:4',
                'brand_slug'=>'required',
            ],
            [
                'brand_name.min'=>'Phải nhập đủ 4 ký tự',
                'brand_name.required' => 'Phải nhập tên',
                'brand_slug.required'=> 'Phải nhập slug'
            ]
        );

        // var_dump($valid->fails());
        // print_r($valid->errors());
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        return $brand->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);
        $count_products = $brand->product->count();

        // var_dump($count_products);

        // nếu muốn làm tay: cần Model Rates
        // // $products = product::where('product_id','=',$id)->get();

        if($count_products != 0){
            return response()->json('Thương hiệu có sản phẩm tồn tại!', 400);
        }

        return $brand->delete();
    }
}
