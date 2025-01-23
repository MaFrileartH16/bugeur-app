<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ProjectSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $managers = User::where('role', 'project_manager')
      ->inRandomOrder()
      ->get();

    if ($managers->isEmpty()) {
      $this->command->warn('No project managers available to assign to projects.');
      return;
    }

    $startYear = 2015; // Tahun awal
    $endYear = now()->year; // Tahun saat ini

    foreach (range($startYear, $endYear) as $year) {
      foreach (range(1, 12) as $month) { // Iterasi setiap bulan dalam tahun
        $totalProjects = rand(5, 15); // Total proyek acak per bulan
        $inactiveCount = rand(1, $totalProjects - 1); // Set jumlah inactive (minimal 1, maksimal total-1)
        $activeCount = $totalProjects - $inactiveCount; // Sisa untuk active

        // Buat proyek inactive
        for ($i = 1; $i <= $inactiveCount; $i++) {
          $createdAt = Carbon::create($year, $month, rand(1, 28)); // Tanggal acak
          $deletedAt = $createdAt->copy()->addDays(rand(1, 30)); // deleted_at dalam 1-30 hari setelah created_at

          Project::factory()->create([
            'created_at' => $createdAt,
            'deleted_at' => $deletedAt, // Tetapkan deleted_at
          ]);
        }

        // Buat proyek active
        for ($i = 1; $i <= $activeCount; $i++) {
          $createdAt = Carbon::create($year, $month, rand(1, 28)); // Tanggal acak
          Project::factory()->create([
            'created_at' => $createdAt,
            'deleted_at' => null, // Proyek aktif tidak memiliki deleted_at
          ]);
        }
      }
    }
  }
}
