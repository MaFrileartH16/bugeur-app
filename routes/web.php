<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

// Dashboard hanya dapat diakses jika pengguna telah login
Route::get('/dashboard', function () {
  return Inertia::render('Dashboard', [
    'title' => 'Dashboard',
    'notification' => session()->pull('notification'),
    'total_users' => User::where('role', '!=', 'Admin')->count(), // Exclude Admin users
  ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Rute untuk users dan projects, hanya dapat diakses oleh pengguna yang telah login
Route::middleware('auth')->group(function () {
  // Rute resource untuk users
  Route::resource('users', UserController::class);

  // Rute resource untuk projects
  Route::resource('projects', ProjectController::class);

  // Rute untuk profile pengguna
  Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Rute untuk autentikasi
require __DIR__ . '/auth.php';
