<?php

namespace Database\Factories;

use App\Models\Bug;
use App\Models\Screenshot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Screenshot>
 */
class ScreenshotFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'bug_id' => Bug::inRandomOrder()->value('id') ?? Bug::factory()->create()->id,
      'images' => $this->faker->imageUrl(),
    ];
  }
}
