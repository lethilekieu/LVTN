<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $incrementing = false;
    protected $table = 'city';
    protected $primaryKey = 'city_id';
    protected $fillable=[
        'city_name', 
        'city_type'
    ];
    public function district(){
        return $this->hasMany(District::class, 'city_id', 'city_id');
    }
}
