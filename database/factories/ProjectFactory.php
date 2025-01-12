<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'manager_id' => User::where('user_type', 'project_manager')->inRandomOrder()->value('id')
        ?? User::factory()->create(['user_type' => 'project_manager'])->id,
      'title' => $this->faker->sentence(1),
    ];
  }
}
