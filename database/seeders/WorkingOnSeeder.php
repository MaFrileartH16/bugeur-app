<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use App\Models\WorkingOn;
use Illuminate\Database\Seeder;

class WorkingOnSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $projects = Project::all();

    $projects->each(function ($project) {
      $roles = ['developer', 'quality_assurance'];

      foreach ($roles as $role) {
        $users = User::where('role', $role)
          ->whereDoesntHave('workingOn', function ($query) use ($project) {
            $query->where('project_id', $project->id);
          })
          ->inRandomOrder()
          ->take(rand(1, 2))
          ->get();

        if ($users->isEmpty()) {
          $users = User::factory(rand(1, 2))->create(['role' => $role]);
        }

        $users->each(function ($user) use ($project) {
          WorkingOn::factory()->create([
            'project_id' => $project->id,
            'user_id' => $user->id,
          ]);
        });
      }
    });
  }
}
