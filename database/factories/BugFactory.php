<?php

namespace Database\Factories;

use App\Models\Bug;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Bug>
 */
class BugFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  protected $model = Bug::class;

  public function definition(): array
  {
    return [
      'project_id' => Project::inRandomOrder()->value('id'),
      'creator_id' => User::where('role', 'quality_assurance')->inRandomOrder()->value('id'),
      'assignee_id' => User::where('role', 'developer')->inRandomOrder()->value('id'),
      'title' => $this->faker->sentence(),
      'description' => $this->faker->paragraph(),
      'status' => $this->faker->randomElement(['in_review', 'open', 'in_progress', 'resolved', 'closed']),
    ];
  }
}
