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
    if (!User::where('user_type', 'admin')->exists()) {
      User::factory()->create([
        'full_name' => 'Admin',
        'username' => 'admin',
        'email' => 'admin@bugeur.id',
        'user_type' => 'admin',
      ]);
    }

    $roles = ['project_manager', 'developer', 'tester', 'designer'];
    foreach ($roles as $role) {
      User::factory(1)->create([
        'user_type' => $role,
      ]);
    }
  }
}
