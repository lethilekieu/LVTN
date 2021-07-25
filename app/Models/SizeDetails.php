<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SizeDetails extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'size_detail'; //sync table name
    protected $primaryKey = 'size_detail_id';
    protected $fillable=[
        'product_id',
        'size_id',
        'create_at',
        'update_at'
    ];
    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function size(){
        return $this->belongsTo(Size::class, 'size_id');
    }
}
