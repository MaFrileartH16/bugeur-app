<?php

namespace Database\Factories;

use App\Models\WorkingOn;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<WorkingOn>
 */
class WorkingOnFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'assigned_at' => now(),
    ];
  }
}
