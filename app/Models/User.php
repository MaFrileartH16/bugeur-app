<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
    'full_name',
    'username',
    'email',
    'user_type',
    'avatar',
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

//  public function projects(): HasMany
//  {
//    return $this->hasMany(Project::class, 'manager_id');
//  }
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
//  public function workingOn(): BelongsToMany
//  {
//    return $this->belongsToMany(Project::class, 'working_on', 'user_id', 'project_id');
//  }

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
