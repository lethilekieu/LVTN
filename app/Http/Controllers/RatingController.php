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
}
