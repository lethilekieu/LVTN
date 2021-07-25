<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'receipt';
    protected $primaryKey = 'receipt_id';
    protected $fillable=[
        'supplier_id', 
        'bill_total',
        'create_at',
        'update_at'
    ];
    public function supplier(){
        return $this->belongsTo(supplier::class, 'supplier_id');
    }
    public function receipt_details(){
        return $this->hasMany(ReceiptDetails::class, 'receipt_id', 'receipt_id');
    }
}
