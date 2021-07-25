<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceiptDetails extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'receipt_details';
    protected $primaryKey = 'receipt_details_id';
    protected $fillable=[
        'receipt_id', 
        'product_id',
        'receipt_quantity',
        'receipt_price',
        'created_at',
        'updated_at'
    ];
    public function receipt(){
        return $this->belongsTo(Receipt::class, 'receipt_id');
    }
    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
}
