<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class WorkingOn extends Pivot
{
  public $timestamps = false;
  
  protected $table = 'working_on';
}
