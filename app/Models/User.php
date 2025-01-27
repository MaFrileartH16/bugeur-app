<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  /** @use HasFactory<UserFactory> */
  use HasApiTokens, HasFactory, HasUlids, Notifiable, SoftDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'profile_photo_path',
    'full_name',
    'email',
    'role',
    'password',
    'deleted_at',
  ];

  protected $dates = ['deleted_at'];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var list<string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  public function projects(): HasMany
  {
    return $this->hasMany(Project::class, 'manager_id');
  }

//
//  public function assignedBugs(): HasMany
//  {
//    return $this->hasMany(Bug::class, 'assignee_id');
//  }
//
//  public function createdBugs(): HasMany
//  {
//    return $this->hasMany(Bug::class, 'creator_id');
//  }
//
  public function workingOn(): BelongsToMany
  {
    return $this->belongsToMany(Project::class, 'working_on', 'user_id', 'project_id')
      ->withPivot('assigned_at');
  }

  public function setPasswordAttribute(string $password): void
  {
    $this->attributes['password'] = Hash::make($password);
  }

  public function setFullNameAttribute(string $value): void
  {
    // Remove extra spaces and capitalize each word
    $formattedName = collect(explode(' ', trim($value)))
      ->filter() // Remove empty strings caused by extra spaces
      ->map(fn($word) => ucfirst(strtolower($word))) // Capitalize each word
      ->implode(' ');

    $this->attributes['full_name'] = $formattedName;
  }

  public function getFullNameAttribute(): string
  {
    // Ensure consistent formatting when retrieving the name
    $formattedName = collect(explode(' ', trim($this->attributes['full_name'])))
      ->filter()
      ->map(fn($word) => ucfirst(strtolower($word)))
      ->implode(' ');

    return $formattedName;
  }

  public function getRoleAttribute(): string
  {
    return ucfirst($this->attributes['role']);
  }

  public function getProfilePhotoPathAttribute(): ?string
  {
    if (!empty($this->attributes['profile_photo_path'])) {
      return asset('storage/' . $this->attributes['profile_photo_path']);
    }

    return null;
  }

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }
}
