<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblOrder extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'tbl_order';
    protected $primaryKey = 'order_id';
    protected $fillable=[
        'customer_id', 
        'ship_id',
        'order_status',
        'fee_ship',
        'total_sold',
        'created_at',
        'updated_at',
    ];
    public function order_details(){
        return $this->hasMany(OrderDetails::class, 'order_id', 'order_id');
    }
    public function customer(){
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }
    public function info_ship(){
        return $this->belongsTo(InfoShip::class, 'ship_id', 'ship_id');
    }
}
