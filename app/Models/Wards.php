<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wards extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $incrementing = false;
    protected $table = 'wards';
    protected $primaryKey = 'wards_id';
    protected $fillable=[
        'wards_name', 
        'wards_type',
        'district_id'
    ];
    public function district(){
        return $this->belongsTo(District::class, 'district_id');
    }
}
