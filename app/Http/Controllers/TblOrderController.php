<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TblOrder;
use App\Models\InfoShip;
use App\Models\Customer;
use App\Models\OrderDetails;
use App\Models\Product;

use Illuminate\Support\Facades\Validator;

class TblOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TblOrder::all();
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
                'customer_id'=>'required', 
                'ship_id'=>'required',
                'order_status'=>'required',
                'fee_ship'=>'required',
                'total_sold'=>'required',
                // 'created_at'=>'required'
            ],
            [
                'customer_id.required'=>'Không lấy được mã khách hàng',
                'ship_id.required' => 'Không tạo được mã giao hàng',
                'order_status.required'=> 'Không lấy được trạng thái',
                'fee_ship.required'=> 'Không lấy được phí giao hàng',
                'total_sold.required'=> 'Chưa lưu được tổng tiền',
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

        return TblOrder::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return TblOrder::findOrFail($id);
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
        $find = TblOrder::findOrFail($id);
        if($request->order_status == 5){//Nếu mà kq trả về có trạng thái là 5
            $findDetails = OrderDetails::where('order_id', $id)->get();//thì sẽ tìm chi tiết sản phẩm theo cái order_id
            // echo($findDetails);
            foreach($findDetails as $value){//Chạy vòng lặp sau khi tìm đc các chi tiết đã được lấy ra
                $f_product = Product::find($value->product_id);//Tìm từng product_id theo các dòng chi tiết

                $updateQuantity = $f_product->product_quantity + $value->product_quantity;//Cộng sản phẩm lên sau khi hủy
                // echo($updateQuantity);
                $update = $f_product->update(['product_quantity' => $updateQuantity]);//Cập nhật lại số lượng sau khi hủy
            }
        }
        // echo($find);
        return $find->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getInfoShipByShipID($id){
        $findOrder = TblOrder::find($id);
        $findInfoShip = InfoShip::find($findOrder->ship_id);
        // echo($findInfoShip);
        return $findInfoShip;
    }

    public function getIncomeStatementByMonth($year){
        $getAllMonthInYear = [];
        for($i=1; $i <= 12 ; $i++) { 
            $findMonthly = TblOrder::where('order_status','!=',5)->where('order_status',4)->whereMonth('created_at',$i)->whereYear('created_at',$year)->sum('total_sold');
            $getAllMonthInYear[] = $findMonthly;
        }
        return response()->json($getAllMonthInYear, 200);
    }
    public function getTotalQuantityByMonth(Request $request){
        $findMonthly = TblOrder::select('product.product_id', 'product.product_name', TblOrder::raw('SUM(order_details.product_quantity) as product_quantity'))
        ->leftJoin('order_details', 'tbl_order.order_id', '=', 'order_details.order_id')
        ->leftJoin('product', 'order_details.product_id', '=', 'product.product_id')
        ->where('tbl_order.order_status',4)
        ->where('tbl_order.order_status','!=',5)
        ->whereMonth('order_details.create_at', $request->month)
        ->whereYear('order_details.create_at', $request->year)
        ->groupBy('product.product_id', 'product.product_name')->get();
        // echo($findMonthly);
        return response()->json($findMonthly, 200);
    }

    public function getOrderByCustomerId($id)
    {
        $customer = Customer::findOrFail($id);
        $getOrder = TblOrder::select()->where('customer_id',$customer->customer_id)->get();
        // echo($getOrder);
        return response()->json($getOrder, 200);
    }

    public function updateAfterChangeStatusOrder($id)
    {
        $customer = Customer::findOrFail($id);
        $getOrder = TblOrder::select()->where('customer_id',$customer->customer_id)->get();
        // echo($getOrder);
        return response()->json($getOrder, 200);
    }
}
