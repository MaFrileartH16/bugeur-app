<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
  /** @use HasFactory<ProjectFactory> */
  use HasFactory, SoftDeletes, HasUlids;

  protected $fillable = ['cover_photo_path', 'manager_id', 'title', 'description'];

  public function manager(): BelongsTo
  {
    return $this->belongsTo(User::class, 'manager_id');
  }

  public function workingOn(): BelongsToMany
  {
    return $this->belongsToMany(User::class, 'working_on', 'project_id', 'user_id')
      ->withPivot('assigned_at');
  }

  public function bugs(): HasMany
  {
    return $this->hasMany(Bug::class, 'project_id', 'id');
  }

  public function getCoverPhotoPathAttribute(): ?string
  {
    if (!empty($this->attributes['cover_photo_path'])) {
      return asset('storage/' . $this->attributes['cover_photo_path']);
    }

    return null;
  }

  public function setCoverPhotoPathAttribute($value): void
  {
    // Jika nilai adalah URL yang mengandung 'http://127.0.0.1:8000/storage/'
    if (is_string($value) && strpos($value, 'http://127.0.0.1:8000/storage/') === 0) {
      // Hapus bagian 'http://127.0.0.1:8000/storage/' dari URL
      $this->attributes['cover_photo_path'] = str_replace('http://127.0.0.1:8000/storage/', '', $value);
    } else {
      // Jika bukan URL, simpan nilai aslinya
      $this->attributes['cover_photo_path'] = $value;
    }
  }
}
