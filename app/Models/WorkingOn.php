<?php

namespace App\Models;

use Database\Factories\WorkingOnFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class WorkingOn extends Pivot
{
  /** @use HasFactory<WorkingOnFactory> */
  use HasFactory;

  public $timestamps = false;

  protected $table = 'working_on';
  
  protected $fillable = ['user_id', 'project_id', 'assigned_at'];
}
