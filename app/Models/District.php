<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $incrementing = false;
    protected $table = 'district';
    protected $primaryKey = 'district_id';
    protected $fillable=[
        'district_name', 
        'city_id',
        'district_type'
    ];
    public function wards(){
        return $this->hasMany(Wards::class, 'district_id', 'district_id');
    }
    public function city(){
        return $this->belongsTo(City::class, 'city_id');
    }
}
