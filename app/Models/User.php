<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
  /** @use HasFactory<UserFactory> */
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'username',
    'email',
    'user_type',
    'password',
  ];

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

  public function assignedBugs(): HasMany
  {
    return $this->hasMany(Bug::class, 'assignee_id');
  }

  public function createdBugs(): HasMany
  {
    return $this->hasMany(Bug::class, 'creator_id');
  }

  public function workingOn(): BelongsToMany
  {
    return $this->belongsToMany(Project::class, 'working_on', 'user_id', 'project_id');
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
