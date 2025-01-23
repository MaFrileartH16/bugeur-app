<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Buat admin jika belum ada
    if (!User::where('role', 'admin')->exists()) {
      User::factory()->create([
        'full_name' => 'Admin',
        'email' => 'admin@bugeur.id',
        'role' => 'admin',
        'password' => 'admin@bugeur.id',
      ]);
    }

    $roles = ['project_manager', 'developer', 'quality_assurance'];

    foreach ($roles as $role) {
      User::factory()->create([
        'role' => $role,
      ]);

      $additionalUsers = random_int(1, 100);
      User::factory($additionalUsers)->create([
        'role' => $role,
      ])->each(function ($user) {
        if (rand(0, 1)) {
          $user->deleted_at = Carbon::now()->subDays(rand(1, 365));
          $user->save();
        }
      });
    }
  }
}
