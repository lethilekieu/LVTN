<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'categories'; //sync table name
    protected $primaryKey = 'categories_id';
    protected $fillable=[
        'categories_name',
        'create_at',
        'update_at'
    ];
    public function product_type(){
        return $this->hasMany(ProductType::class, 'categories_id', 'categories_id');
    }
}
