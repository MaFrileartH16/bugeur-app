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
    $email = $this->faker->unique()->safeEmail;

    return [
      'username' => $this->faker->userName,
      'email' => $email,
      'user_type' => $this->faker->randomElement(['admin', 'project_manager', 'developer', 'tester']),
      'password' => Hash::make($email),
    ];
  }
}
