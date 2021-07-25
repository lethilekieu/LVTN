<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Slide;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Slide::all();
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
            'slide_name'=>'required',
            'slide_desc'=>'required',
            'slide_image'=>'required'
        ],[
            'slide_name.required'=>'Phải nhập tên',
            'slide_desc.required'=>'Phải nhập mô tả',
            'slide_image.required'=>'Phải nhập hình'
        ]);
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        return Slide::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Slide::findOrFail($id);
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
        $slide = Slide::findOrFail($id);
        $valid = Validator::make($request->all(),
        [
            'slide_name'=>'required',
            'slide_desc'=>'required',
            'slide_image'=>'required'
        ],[
            'slide_name.required'=>'Phải nhập tên',
            'slide_desc.required'=>'Phải nhập mô tả',
            'slide_image.required'=>'Phải nhập hình'
        ]);
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        return $slide->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $slide = Slide::findOrFail($id);
        return $slide->delete();
    }
}
