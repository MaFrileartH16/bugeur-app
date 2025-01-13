<?php

namespace App\Models;

use Database\Factories\BugFactory;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bug extends Model
{
  /** @use HasFactory<BugFactory> */
  use HasFactory, HasUlids, softDeletes;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'project_id',
    'creator_id',
    'assignee_id',
    'title',
    'description',
    'status',
  ];
}
