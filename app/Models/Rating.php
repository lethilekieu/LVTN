<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'tbl_rating';
    protected $primaryKey = 'id';
    protected $fillable=[
        'customer_id', 
        'product_id',
        'rating',
        'comment',
        'status',
        'del_flg',
        'created_at',
        'updated_at',
    ];
    function customer() {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }
    function product(){
        return $this->belongsTo(Customer::class, 'product_id', 'product_id');
    }
}
