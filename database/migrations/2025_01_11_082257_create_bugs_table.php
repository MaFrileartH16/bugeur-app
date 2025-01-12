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
    Schema::create('bugs', function (Blueprint $table) {
      $table->id();
      $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
      $table->string('title');
      $table->foreignId('assignee_id')->nullable()->constrained('users')->nullOnDelete();
      $table->enum('status', ['open', 'in_progress', 'resolved', 'closed']);
      $table->text('description');
      $table->foreignId('creator_id')->constrained('users')->cascadeOnDelete();
      $table->date('deadline');
      $table->enum('bug_type', ['critical', 'major', 'minor']);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('bugs');
  }
};
