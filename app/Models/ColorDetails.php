<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorDetails extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'color_details';
    protected $primaryKey = 'color_detail_id';
    protected $fillable=[
        'product_id',
        'color_id',
        'create_at',
        'update_at'
    ];
    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function color(){
        return $this->belongsTo(Color::class, 'color_id');
    }
}