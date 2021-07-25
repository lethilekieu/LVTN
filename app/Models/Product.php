<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';
    public $timestamps = false;
    protected $primaryKey = 'product_id';
    protected $fillable = [
        'product_id',
        'product_name',
        'product_quantity',
        'product_slug',
        'product_type_id',
        'brand_id',
        'unit',
        'unit_price',
        'promotion_price',
        'product_desc',
        'product_content',
        'product_image',
        'product_status',
        //'create_at',
        //'update_at'
    ];
    public function brand(){
        return $this->belongsTo(Brand::class, 'brand_id');
    }
    public function product_type(){
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }
    public function color_details(){
        return $this->hasMany(ColorDetails::class, 'product_id', 'product_id');
    }
    public function size_detail(){
        return $this->hasMany(SizeDetails::class, 'product_id', 'product_id');
    }
    public function receipt_details(){
        return $this->hasMany(ReceiptDetails::class, 'product_id', 'product_id');
    }
    public function order_details(){
        return $this->hasMany(OrderDetails::class, 'product_id', 'product_id');
    }
}
