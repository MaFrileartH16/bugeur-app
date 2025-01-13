<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('working_on', function (Blueprint $table) {
      $table->foreignUlid('project_id')->constrained('projects')->cascadeOnDelete();
      $table->foreignUlid('user_id')->constrained('users')->cascadeOnDelete();
      $table->timestamp('assigned_at')->useCurrent();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('working_on');
  }
};
