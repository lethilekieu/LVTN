<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\models\Categories;
use App\models\ProductType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Categories::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public function findProductType($id){
    //     $cate=DB::table('categories')->where('categories_id',$id)->gte();
    //     $type=$cate->product_type;
    //     foreach ($type as $sp) {
    //         $product_type_id = $sp->product_type_id;
    //     }
    //     $all_product_type=DB::table('product_type')->where('product_type_id', $product_type_id)->get();
    //     return response()->json($all_product_type);
    // }
    public function store(Request $request)
    {
        $valid = Validator::make($request->all(),
            [
                'categories_name'=>'required'
            ],
            [
                'categories_name.required'=>'Phải nhập tên loại'
            ]
        );
        // var_dump($request->all());
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        return Categories::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // var_dump($cate->all());
        return Categories::findOrFail($id);
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
        $category = Categories::findOrFail($id);
        $valid = Validator::make($request->all(),
            [
                'categories_name'=>'required'
            ],
            [
                'categories_name.required'=>'Phải nhập tên loại'
            ]
        );
        // var_dump($request->all());
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        return $category->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cate = Categories::findOrFail($id);
        $count_product_types = $cate->product_type->count();
        if($count_product_types != 0){
            return response()->json('Dạng sản phẩm có tồn tại loại!', 400);
        }
        return $cate->delete();
    }
}
