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
      $table->ulid('id')->primary();
      $table->foreignUlid('project_id')->constrained('projects')->cascadeOnDelete();
      $table->foreignUlid('creator_id')->constrained('users')->cascadeOnDelete();
      $table->foreignUlid('assignee_id')->nullable()->constrained('users')->cascadeOnDelete();
      $table->string('title');
      $table->text('description');
      $table->enum('status', ['in_review', 'open', 'in_progress', 'resolved', 'closed'])->default('in_review');
      $table->timestamps();
      $table->softDeletes();
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
