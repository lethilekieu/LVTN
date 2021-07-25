<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoShip extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'info_ship';
    protected $primaryKey = 'ship_id';
    protected $fillable=[
        'ship_address',
        'ship_phone',
        'ship_email',
        'ship_notes',
        'ship_method',
        'created_at',
    ];
    public function tbl_order(){
        return $this->hasMany(TblOrder::class, 'ship_id', 'ship_id');
    }
}
