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
    // Buat admin jika belum ada
    if (!User::where('role', 'admin')->exists()) {
      User::factory()->create([
        'full_name' => 'Admin',
        'email' => 'admin@bugeur.id',
        'role' => 'admin',
        'password' => 'admin@bugeur.id'
      ]);
    }

    // Role lain yang harus di-generate
    $roles = ['project_manager', 'developer', 'quality_assurance'];

    foreach ($roles as $role) {
      // Pastikan ada setidaknya 1 pengguna untuk setiap role
      User::factory()->create([
        'role' => $role,
      ]);

      // Tambahkan jumlah pengguna acak untuk setiap role (1 hingga 20 tambahan)
      $additionalUsers = random_int(1, 20);
      User::factory($additionalUsers)->create([
        'role' => $role,
      ]);
    }
  }
}
