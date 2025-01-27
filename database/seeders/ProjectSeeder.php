<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ProjectSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $totalProjects = 1; // Total proyek yang akan dibuat
    $availableYears = range(2015, now()->year); // Rentang tahun dari 2015 hingga tahun sekarang
    $selectedYears = collect($availableYears)->random(rand(3, count($availableYears))); // Pilih tahun secara acak

    foreach (range(1, $totalProjects) as $i) {
      // Pilih tahun secara acak dari tahun yang telah dipilih
      $randomYear = $selectedYears->random();

      // Pilih bulan dan hari secara acak
      $randomMonth = rand(1, 12); // Bulan acak (1-12)
      $randomDay = rand(1, Carbon::create($randomYear, $randomMonth)->daysInMonth); // Hari acak berdasarkan jumlah hari di bulan tersebut

      $createdAt = Carbon::create($randomYear, $randomMonth, $randomDay, rand(0, 23), rand(0, 59)); // Tanggal dan waktu acak
      $isInactive = rand(0, 1); // Tentukan apakah proyek ini akan menjadi inactive (0 = active, 1 = inactive)

      Project::factory()->create([
        'created_at' => $createdAt,
        'deleted_at' => $isInactive
          ? $createdAt->copy()->addDays(rand(1, 30))->addHours(rand(0, 23))->addMinutes(rand(0, 59)) // Waktu deleted_at jika inactive
          : null, // Null jika proyek active
      ]);
    }
  }
}
