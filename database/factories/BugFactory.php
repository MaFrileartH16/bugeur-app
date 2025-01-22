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
      'project_id' => Project::inRandomOrder()->value('id')
        ?? Project::factory()->create()->id, // Jika tidak ada proyek, buat baru
      'creator_id' => User::where('role', 'quality_assurance')->inRandomOrder()->value('id')
        ?? User::factory()->create(['role' => 'quality_assurance'])->id, // Jika tidak ada QA, buat baru
      'assignee_id' => User::where('role', 'developer')->inRandomOrder()->value('id')
        ?? User::factory()->create(['role' => 'developer'])->id, // Jika tidak ada Developer, buat baru
      'title' => $this->faker->sentence(),
      'description' => $this->faker->paragraph(),
      'evidence_image' => $this->faker->imageUrl(),
      'created_at' => $this->faker->dateTimeBetween('-10 years', 'now'),// Random created_at dalam 1 tahun terakhir
    ];
  }
}
