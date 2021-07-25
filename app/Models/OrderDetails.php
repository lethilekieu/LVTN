<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'order_details';
    protected $primaryKey = 'order_details_id';
    protected $fillable=[
        'order_id', 
        'product_id',
        'color_name',
        'size_name',
        'unit_price',
        'promotion_price',
        'product_quantity'
    ];
    public function product(){
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
    public function tbl_order(){
        return $this->belongsTo(TblOrder::class, 'order_id', 'order_id');
    }
}
