<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminAccount extends Model
{
    use HasFactory;
    protected $table = 'admin';
    public $timestamps = false;
    protected $primaryKey = 'admin_id';
    protected $fillable = [
        'admin_name',
        'admin_email',
        'admin_phone',
        'admin_password',
        'grant'
    ];
}
