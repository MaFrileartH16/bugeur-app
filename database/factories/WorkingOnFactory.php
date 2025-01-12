<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
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
      'project_id' => Project::inRandomOrder()->value('id')
        ?? Project::factory()->create()->id,
      'user_id' => User::where('user_type', 'developer')->inRandomOrder()->value('id')
        ?? User::factory()->create(['user_type' => 'developer'])->id,
    ];
  }
}
