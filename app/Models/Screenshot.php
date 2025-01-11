<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Screenshot extends Model
{
  use HasFactory;

  public $timestamps = false;

  protected $fillable = [
    'bug_id',
    'images',
  ];

  public function bug(): BelongsTo
  {
    return $this->belongsTo(Bug::class);
  }
}
