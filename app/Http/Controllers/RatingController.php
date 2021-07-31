<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rating;
use App\Models\TblOrder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{
    /**
     * Send rating to product
     *
     * @return \Illuminate\Http\Response
     */
    public function rating(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();

            if (!$this->canRating($data["customer_id"], $data["product_id"])) {
                return response()->json([
                    'message' => 'Bạn đã đánh giá sản phẩm này rồi !',
                    'status' => false,
                ], 200);
            }
            $rating = Rating::create([
                'customer_id' => $data["customer_id"],
                'product_id' => $data["product_id"],
                'rating' => (float) $data["rating"],
                'comment' => $data["comment"],
                'status' => 1,
                'del_flg' => 0,
            ]);

            if (!$rating->exists) {
                DB::rollBack();
                return response()->json([
                    'message' => 'Bạn đã đánh giá sản phẩm này rồi !',
                    'status' => false,
                ], 200);
            }
            DB::commit();
            return response()->json([
                'message' => 'Gửi đánh giá thành công!',
                'status' => true,
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $e->getMessage(),
                'status' => false
            ], 500);
        }
    }

    /**
     * If user can rating
     *
     * @return boolean
     */
    public function canRating($customerId, $productId)
    {
        if ($customerId == "") {
            return false;
        }

        $order = TblOrder::select('tbl_order.order_id', 'tbl_order.customer_id')
                            ->leftJoin('order_details as dt', 'tbl_order.order_id', '=', 'dt.order_id')
                            ->where('tbl_order.order_status', 4)
                            ->where('tbl_order.customer_id', $customerId)
                            ->where('dt.product_id', $productId)
                            ->get();

        $rated = Rating::where('customer_id', $customerId)->where('product_id', $productId)->get();

        if (count($rated) == 0 && count($order) > 0) {
            return true;
        }
        
        return false;
    }

    /**
     * Get list rating of product
     *
     * @return Array
     */
    public function getRatingList(Request $request)
    {
        $data = json_decode($request->data);

        $query = Rating::select("tbl_rating.rating", "tbl_rating.comment", "tbl_rating.created_at", "c.customer_name")
                        ->leftJoin('customer as c', 'c.customer_id', '=', 'tbl_rating.customer_id')
                        ->where('tbl_rating.product_id', $data->product_id)
                        ->groupBy('tbl_rating.product_id');

        $ratings = $query->paginate(10);

        return [
            'ratings' => $ratings,
            'canRating' => $this->canRating($data->customer_id, $data->product_id),
        ];
    }
    
    /**
     * Get list rating of product
     *
     * @return Rating
     */
    public function getRatingListByAdmin(Request $request)
    {
        $data = json_decode($request->data);

        $query = Rating::leftJoin('product', 'tbl_rating.product_id', '=', 'product.product_id')
                        ->leftJoin('customer', 'tbl_rating.customer_id', '=', 'customer.customer_id')
                        ->addSelect('tbl_rating.id', 'tbl_rating.rating', 'tbl_rating.comment', 'tbl_rating.status')
                        ->addSelect('customer.customer_name')
                        ->addSelect('product.product_name')->where('del_flg', 0)->orderBy('tbl_rating.created_at', 'ASC');

        $ratings = $query->paginate(10);

        return $ratings;
    }

    /**
     * Change status of rating
     *
     * @return \Illuminate\Http\Response
     */
     public function changeRatingStatus(Request $request)
     {
        DB::beginTransaction();

        try {

            $data = $request->all();

            if($data["id"] == "") {
                return response()->json([
                    'message' => 'Đánh giá không tồn tại !',
                    'status' => false,
                ], 200);
            }
            $rating = Rating::find($data["id"]);
            $rating->status = $data["status"];
            if($rating->save()) {
                DB::commit();
                
                return response()->json([
                    'message' => 'Thay đổi thành công !',
                    'status' => true,
                ], 200);
            } else {
                DB::rollback();

                return response()->json([
                    'message' => 'Thay đổi không thành công !',
                    'status' => false,
                ], 200);
            }

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
                'status' => false,
            ], 200);
        }
     }

    /**
     * Delete rating
     *
     * @return \Illuminate\Http\Response
     */
     public function deleteRating(Request $request)
     {
        DB::beginTransaction();

        try {

            $data = $request->all();

            if($data["id"] == "") {
                return response()->json([
                    'message' => 'Đánh giá không tồn tại !',
                    'status' => false,
                ], 200);
            }
            $rating = Rating::find($data["id"]);

            // 1 là đã xoá
            // 2 là chưa xoá

            $rating->del_flg = 1;

            if($rating->save()) {
                DB::commit();

                return response()->json([
                    'message' => 'Xoá thành công !',
                    'status' => true,
                ], 200);
            } else {
                DB::rollback();

                return response()->json([
                    'message' => 'Xoá không thành công !',
                    'status' => false,
                ], 200);
            }

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => $e->getMessage(),
                'status' => false,
            ], 200);
        }
     }
}
