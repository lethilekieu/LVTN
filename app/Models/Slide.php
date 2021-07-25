<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{

    use HasFactory;
    public $timestamps = false;
    protected $table = "slide";
    protected $primaryKey = "slide_id";
    protected $fillable = [
        'slide_name',
        'slide_desc',
        'slide_status',
        'slide_image'
    ];
}
