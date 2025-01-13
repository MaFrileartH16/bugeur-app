<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $managers = User::where('role', 'project_manager')
      ->whereDoesntHave('projects')
      ->inRandomOrder()
      ->get();

    if ($managers->isEmpty()) {
      $this->command->warn('No project managers available to assign to projects.');
      return;
    }

    Project::factory($managers->count())->create()->each(function ($project) use (&$managers) {
      $manager = $managers->shift();

      if ($manager) {
        $project->manager_id = $manager->id;
        $project->save();
      }
    });
  }
}
