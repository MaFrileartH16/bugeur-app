<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
  use HasFactory;

  protected $fillable = [
    'manager_id',
    'title',
  ];

  public function manager(): BelongsTo
  {
    return $this->belongsTo(User::class, 'manager_id');
  }

  public function bugs(): HasMany
  {
    return $this->hasMany(Bug::class, 'project_id');
  }

  public function members(): BelongsToMany
  {
    return $this->belongsToMany(User::class, 'working_on', 'project_id', 'user_id');
  }
}
