<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
  /** @use HasFactory<ProjectFactory> */
  use HasFactory, SoftDeletes, HasUlids;

  protected $fillable = ['manager_id', 'title', 'description'];

  public function manager(): BelongsTo
  {
    return $this->belongsTo(User::class, 'manager_id');
  }
}
