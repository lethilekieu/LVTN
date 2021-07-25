<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InfoShip;

use Illuminate\Support\Facades\Validator;

class InfoShipController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return InfoShip::all();
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
                'ship_address'=>'required',
                'ship_phone'=>'required',
                'ship_email'=>'required',
                'ship_method'=>'required',
                // 'created_at'=>'required',
            ],
            [
                'ship_address.required' => 'Không lưu được địa chỉ giao hàng',
                'ship_phone.required'=> 'Không lấy được số điện thoại',
                'ship_email.required'=> 'Không lấy được số email khách hàng',
                'ship_method.required'=> 'Chưa lưu được phương thức thanh toán',
                // 'created_at.required'=> 'Chưa lưu được ngày đặt hàng'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }

        return InfoShip::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return InfoShip::findOrFail($id);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ship = InfoShip::findOrFail($id);
        $count_order = $ship->tbl_order->count();
        if($count_order != 0){
            return response()->json('Thông tin giao hàng có tồn tại đơn đặt hàng!', 400);
        }
        return $ship->delete();
    }
}
