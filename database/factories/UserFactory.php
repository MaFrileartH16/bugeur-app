<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
  protected $model = User::class;

  public function definition(): array
  {
    return [
      'full_name' => $this->faker->name(),
      'username' => $this->faker->unique()->userName(),
      'email' => $this->faker->unique()->safeEmail(),
      'user_type' => $this->faker->randomElement(['admin', 'project_manager', 'developer', 'tester', 'designer']),
      'avatar' => $this->faker->imageUrl(200, 200, 'people'),
      'password' => Hash::make('password'),
//      'remember_token' => Str::random(10),
    ];
  }
}
