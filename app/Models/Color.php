<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'color'; //sync table name
    protected $primaryKey = 'color_id';
    protected $fillable=[
        'color_name',
        'created_at',
        'update_at'
    ];
    public function color_details(){
        return $this->hasMany(ColorDetails::class, 'color_id', 'color_id');
    }
}
