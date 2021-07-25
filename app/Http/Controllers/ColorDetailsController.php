<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ColorDetails;
use App\Models\Color;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;
use App\Models\Product;

class ColorDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ColorDetails::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $find = ColorDetails::where('color_id',$request->color_id)->where('product_id',$request->product_id)->get();
        if($find->count()>0){
            return response()->json('Đã tồn tại màu cho sản phẩm này', 400);
        }
        return ColorDetails::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ColorDetails::findOrFail($id);
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
        $details = ColorDetails::findOrFail($id);
        $find = ColorDetails::where('color_id',$request->color_id)->where('product_id',$request->product_id)->get();
        if($find->count()>0){
            return response()->json('Đã tồn tại màu cho sản phẩm này', 400);
        }
        return $details->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $details = ColorDetails::findOrFail($id);
        return $details->delete();
    }

    public function getColor($id){
        $arr_color = [];
        $findColors = ColorDetails::select('color_id')->where('product_id', $id)->get();
        // echo($findColors[0]->color_id);
        foreach ($findColors as $key => $value){
            // echo($value->color_id);
            $arr_color[] = Color::select('color_id', 'color_name')->where('color_id', $value->color_id)->first();
        }
        return $arr_color;
        // $findProduct_inColorDetails = ColorDetails::findOrFail($id);
    }
}
