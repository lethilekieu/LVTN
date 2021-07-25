<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'size'; //sync table name
    protected $primaryKey = 'size_id';
    protected $fillable=[
        'size_name',
        'size_desc',
        'create_at',
        'update_at'
    ];
    public function size_detail(){
        return $this->hasMany(SizeDetails::class, 'size_id', 'size_id');
    }
}
