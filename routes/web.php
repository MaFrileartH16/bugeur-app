<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');
Route::middleware('auth')->group(function () {
  Route::get('/dashboard', function () {
    $user = auth()->user();

    $projects = $user->role === 'Admin'
      ? Project::all()
      : Project::whereHas('workingOn', function ($query) use ($user) {
        $query->where('user_id', $user->id);
      })->get();

    return Inertia::render('Dashboard', [
      'title' => 'Dashboard',
      'notification' => session()->pull('notification'),
      'total_users' => User::where('role', '!=', 'Admin')->count(),
      'total_projects' => $projects->count(),
      'projects' => $projects,
    ]);
  })->name('dashboard');

  Route::resource('users', UserController::class);
  Route::resource('projects', ProjectController::class);

  Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Rute untuk autentikasi
require __DIR__ . '/auth.php';
