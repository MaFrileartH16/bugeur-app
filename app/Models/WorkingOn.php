<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class WorkingOn extends Pivot
{
  protected $table = 'working_on';
}
