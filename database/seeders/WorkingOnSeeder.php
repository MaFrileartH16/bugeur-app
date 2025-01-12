<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Database\Factories\WorkingOnFactory;
use Illuminate\Database\Seeder;

class WorkingOnSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    if (Project::count() === 0) {
      Project::factory(16)->create();
    }

    if (User::where('user_type', 'developer')->count() === 0) {
      User::factory(16)->create(['user_type' => 'developer']);
    }

    WorkingOnFactory::new()->count(16)->create();
  }
}
