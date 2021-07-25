<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class supplier extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "supplier";
    protected $primaryKey = 'supplier_id';
    protected $fillable = [
        'supplier_name',
        'created_at',
        'update_at'
    ];
    public function receipt(){
        return $this->hasMany(Receipt::class, 'supplier_id', 'supplier_id');
    }
}
