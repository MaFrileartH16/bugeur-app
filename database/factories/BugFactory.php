<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BugFactory extends Factory
{
  public function definition()
  {
    return [
      'project_id' => Project::inRandomOrder()->first()->id,
      'creator_id' => User::where('role', 'Quality Assurance')->inRandomOrder()->first()->id,
      'assignee_id' => User::where('role', 'Developer')->inRandomOrder()->first()->id,
      'title' => $this->faker->sentence(6),
      'description' => $this->faker->paragraph(3),
      'evidence_image' => $this->faker->imageUrl(640, 480, 'bugs', true, 'Bug Evidence'),
      'created_at' => now(),
      'updated_at' => now(),
    ];
  }
}
