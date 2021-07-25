<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    public $timestamps =false;
    protected $table = 'customer';
    protected $primaryKey = 'customer_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable=[
        'customer_id',
        'customer_name',
        'customer_email',
        'customer_password',
        'customer_phone',
        'create_at',
        'update_at'
    ];
    public function tbl_order(){
        return $this->hasMany(TblOrder::class, 'customer_id', 'customer_id');
    }
}
