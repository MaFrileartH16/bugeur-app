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
      'title' => $this->faker->sentence(1),
      'assignee_id' => User::factory()->create(['user_type' => 'developer'])->id,
      'status' => $this->faker->randomElement(['open', 'in_progress', 'resolved', 'closed']),
      'description' => $this->faker->paragraph,
      'creator_id' => User::factory()->create(['user_type' => 'tester'])->id,
      'deadline' => $this->faker->dateTimeBetween('now', '+1 month'),
      'bug_type' => $this->faker->randomElement(['critical', 'major', 'minor']),
    ];
  }
}
