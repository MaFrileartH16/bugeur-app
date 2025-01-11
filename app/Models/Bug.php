<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bug extends Model
{
  use HasFactory;

  protected $primaryKey = 'bug_id';

  protected $fillable = [
    'project_id',
    'title',
    'assignee_id',
    'status',
    'description',
    'creator_id',
    'deadline',
    'bug_type',
  ];

  public function project(): BelongsTo
  {
    return $this->belongsTo(Project::class, 'project_id');
  }

  public function assignee(): BelongsTo
  {
    return $this->belongsTo(User::class, 'assignee_id');
  }

  public function creator(): BelongsTo
  {
    return $this->belongsTo(User::class, 'creator_id');
  }

  public function screenshots(): HasMany
  {
    return $this->hasMany(Screenshot::class, 'bug_id');
  }
}
