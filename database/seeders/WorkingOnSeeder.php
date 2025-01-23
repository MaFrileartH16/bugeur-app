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
    // Ambil semua proyek, termasuk yang soft deleted
    $projects = Project::withTrashed()->get();

    $projects->each(function ($project) {
      $roles = ['developer', 'quality_assurance']; // Role yang harus di-assign

      foreach ($roles as $role) {
        // Ambil user dengan role tertentu yang belum memiliki relasi ke proyek ini
        $users = User::where('role', $role)
          ->whereDoesntHave('workingOn', function ($query) use ($project) {
            $query->where('project_id', $project->id);
          })
          ->inRandomOrder()
          ->take(rand(1, 2)) // Ambil 1 hingga 2 user secara random
          ->get();

        // Jika tidak ada user yang tersedia, buat user baru
        if ($users->isEmpty()) {
          $users = User::factory(rand(1, 2))->create(['role' => $role]);
        }

        // Assign setiap user ke proyek ini
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
