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
  use HasFactory, softDeletes, HasUlids;

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
    'evidence_image'
  ];

//  public function getStatusAttribute($value): string
//  {
//    return ucfirst(str_replace('_', ' ', $value));
//  }

//  public function getEvidenceImageAttribute($value): ?string
//  {
//    // Gunakan Storage untuk menghasilkan URL
//    return $value ? Storage::url($value) : null;
//  }

//  public function project()
//  {
//    return $this->belongsTo(Project::class);
//  }
//
//  public function creator()
//  {
//    return $this->belongsTo(User::class, 'creator_id');
//  }
//
  public function assignee()
  {
    return $this->belongsTo(User::class, 'assignee_id');
  }

  public function project()
  {
    return $this->belongsTo(Project::class, 'project_id');
  }
}
