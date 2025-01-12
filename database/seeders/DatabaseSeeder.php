<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // Seed user admin
//    User::create([
//      'username' => 'admin',
//      'email' => 'admin@bugeur.id',
//      'user_type' => 'admin',
//      'password' => Hash::make('admin@bugeur.id'),
//    ]);


    $this->call([
      UserSeeder::class,
//      ProjectSeeder::class,
//      WorkingOnSeeder::class,
//      BugSeeder::class,
//      ScreenshotSeeder::class,
    ]);
  }
}
