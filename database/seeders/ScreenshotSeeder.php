<?php

namespace Database\Seeders;

use App\Models\Screenshot;
use Illuminate\Database\Seeder;

class ScreenshotSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Screenshot::factory(16)->create();
  }
}
