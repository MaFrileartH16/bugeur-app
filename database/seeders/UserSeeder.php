<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    if (!User::where('role', 'admin')->exists()) {
      User::factory()->create([
        'full_name' => 'Admin',
        'email' => 'admin@bugeur.id',
        'role' => 'admin',
      ]);
    }

    $roles = ['project_manager', 'developer', 'quality_assurance'];
    foreach ($roles as $role) {
      User::factory(4)->create([
        'role' => $role,
      ]);
    }
  }
}
