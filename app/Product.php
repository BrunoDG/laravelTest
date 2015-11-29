<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $table = 'produto';
    protected $fillable = ['sku','name','stock'];
}
