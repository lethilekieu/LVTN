<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\SizeDetails;
use App\Models\ProductType;
use DB;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
    }

    public function getPagination()
    {
        return Product::paginate(3);
    }

    // public function show_new(){
    //     $all_sp_new=Product::where('product_status',1)->get();
    //     return $all_sp_new;
    // }
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
                'product_id'=>'required|unique:product,product_id',
                'product_name'=>'required|min:3',
                'product_quantity'=>'required',
                'product_slug'=>'required|unique:product,product_slug',
                // 'product_type_id'=>'required',
                // 'brand_id'=>'required',
                'unit'=>'required',
                'unit_price'=>'required|numeric',
                'promotion_price'=>'required|numeric',
                'product_desc'=>'required',
                'product_content'=>'required',
                'product_image'=>'required',
                // 'product_status'=>'required'
            ],
            [
                'product_id.required'=>'Bạn chưa nhập mã sản phẩm',
                'product_id.unique'=>'Mã sản phẩm đã tồn tại',
                'product_name.required'=>'Bạn chưa nhập tên người dùng',
                'product_name.min'=>'Tên sản phẩm phải ít nhất 3 kí tự',
                'product_quantity.required'=>'Bạn chưa nhập số lượng',
                'product_slug.required'=>'Bạn chưa nhập slug',
                'product_slug.unique'=>'Slug đã tồn tại',
                'unit.required'=>'Nhập đơn vị tính',
                'unit_price.required'=>'Bạn chưa nhập giá',
                'unit_price.numeric'=>'Giá chưa đúng định dạng',
                'promotion_price.required'=>'Bạn chưa nhập giá khuyến mãi',
                'promotion_price.numeric'=>'Giá khuyến mãi chưa đúng định dạng',
                'product_desc.required'=>'Chưa nhập mô tả',
                'product_content.required'=>'Chưa nhập nội dung',
                'product_image.required'=>'Hình không được để trống',
                // 'product_image.image'=>'Hình chưa đúng định dạng'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        return Product::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function findIdBySlug($slug)
    {
        return Product::select('product_id')->where('product_slug',$slug)->first();//get url theo slug phía backend
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
        $valid = Validator::make($request->all(),
            [
                'product_name'=>'required|min:3',
                'product_quantity'=>'required',
                'product_slug'=>'required',
                // 'product_type_id'=>'required',
                // 'brand_id'=>'required',
                'unit'=>'required',
                'unit_price'=>'required|numeric',
                'promotion_price'=>'required|numeric',
                'product_desc'=>'required',
                'product_content'=>'required',
                // 'product_image'=>'required',
                // 'product_status'=>'required'
            ],
            [
                'product_name.required'=>'Bạn chưa nhập tên người dùng',
                'product_name.min'=>'Tên sản phẩm phải ít nhất 3 kí tự',
                'product_quantity.required'=>'Bạn chưa nhập số lượng',
                'product_slug.required'=>'Bạn chưa nhập slug',
                'unit.required'=>'Nhập đơn vị tính',
                'unit_price.required'=>'Bạn chưa nhập giá',
                'unit_price.numeric'=>'Giá chưa đúng định dạng',
                'promotion_price.required'=>'Bạn chưa nhập giá khuyến mãi',
                'promotion_price.numeric'=>'Giá khuyến mãi chưa đúng định dạng',
                'product_desc.required'=>'Chưa nhập mô tả',
                'product_content.required'=>'Chưa nhập nội dung',
                // 'product_image.required'=>'Hình không được để trống',
                // 'product_image.image'=>'Hình chưa đúng định dạng'
            ]
        );
        if($valid->fails()){
            $err = [];
            foreach($valid->errors()->messages() as $key => $value){
                // echo($value[0]);
                $err[] = $value[0];
            }
            return response()->json($err, 400);
        }
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json('Cập nhật thành công', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $count_colors = $product->color_details->count();
        if($count_colors != 0){
            return response()->json('Sản phẩm có tồn tại chi tiết màu!', 400);
        }
        $count_sizes = $product->size_detail->count();
        if($count_sizes != 0){
            return response()->json('Sản phẩm có tồn tại chi tiết size!', 400);
        }
        $count_receipts = $product->receipt_details->count();
        if($count_receipts != 0){
            return response()->json('Sản phẩm có tồn tại chi tiết phiếu nhập!', 400);
        }
        return $product->delete();
    }
    public function Search($key){
        return Product::where('product_name', 'Like', "%$key%")->get();
    }
    //Show theo thương hiệu
    public function showProductBrand($key){
        return Product::where('brand_id', $key)->paginate(3);
        // ->Paginate(3) ->get()
    }

    //Show theo loai
    public function showProductType($key){
        return Product::where('product_type_id', $key)->get();
        // ->Paginate(3)
    }
    // public function showProductCate($key){
    //     $cate_pro = DB::table('categories')->join('product_type', 'categories.categories_id', '=', 'product_type.categories_id')
    //         ->join('product', 'product.product_type_id', '=', 'product_type.product_type_id')->where('categories.categories_id', $key)->get();
    //     return $cate_pro;
    //     // ->Paginate(3)
    // }

    public function showProductCate($id){
        $arr_product = [];

        $findProduct = ProductType::where('categories_id', $id)->get();
        foreach($findProduct as $key => $value){
            $arr_product = Product::where('product_type_id', $value->product_type_id)->get();
        }
        return $arr_product;
    }

    //show size
    // public function getProductSize($id){
    //     return $id;
    //     $arr_product = [];

    //     $findProduct = SizeDetails::select('product_id')->where('size_id', $id)->get();
    //     foreach($findProduct as $key => $value){
    //         $arr_product[] = Product::where('product_id', $value->product_id)->get();
    //     }
    //     return $arr_product;
    // }
    public function getProductSize($id){
        $arr = explode('-',$id);
        $arr_product=[];
        
        $findProduct = SizeDetails::select('product_id')->wherein('size_id', $arr)->get();
        foreach($findProduct as $key => $value){
            if (!in_array(Product::find($value->product_id), $arr_product)) {
                $arr_product[] = Product::find($value->product_id)->get();
            }
        }
        return $arr_product;
      
     }

    public function updateQuantityAfterOrder(Request $request, $id){
        $findPro = Product::find($id);
        $updateQuantity = $findPro->product_quantity - $request->product_quantity;
        
        $findPro->update(['product_quantity'=>$updateQuantity]);
        return response()->json('Cập nhật thành công', 200);
    }
}
