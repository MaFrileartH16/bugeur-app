<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // Seed user admin
    User::create([
      'username' => 'admin',
      'email' => 'admin@bugeur.id',
      'user_type' => 'admin',
      'password' => Hash::make('admin@bugeur.id'),
    ]);

    // Uncomment jika ingin menjalankan seeder tambahan
    /*
    $this->call([
        UserSeeder::class,
        ProjectSeeder::class,
        WorkingOnSeeder::class,
        BugSeeder::class,
        ScreenshotSeeder::class,
    ]);
    */
  }
}
