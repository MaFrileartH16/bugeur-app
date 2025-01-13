<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
  protected $model = User::class;

  public function definition(): array
  {
    $fullName = $this->faker->firstName() . ' ' . $this->faker->lastName();
    $email = strtolower(str_replace(' ', '.', $fullName)) . '@bugeur.id';

    return [
      'full_name' => $fullName,
      'email' => $email,
      'role' => $this->faker->randomElement(['admin', 'project_manager', 'developer', 'quality_assurance']),
      'password' => $email,
//      'remember_token' => Str::random(10),
    ];
  }
}
