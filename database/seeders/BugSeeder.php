<?php

namespace Database\Seeders;

use App\Models\Bug;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class BugSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run()
  {
    // Pastikan ada data di tabel projects dan users dengan role terkait
    if (Project::count() > 0 && User::where('role', 'Quality Assurance')->count() > 0 && User::where('role', 'Developer')->count() > 0) {
      Bug::factory(1)->create();
    }
  }
}
