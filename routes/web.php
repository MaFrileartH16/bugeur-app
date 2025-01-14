<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

//Route::get('/', function () {
//  return Inertia::render('Welcome', [
//    'canLogin' => Route::has('login'),
//    'canRegister' => Route::has('register'),
//    'laravelVersion' => Application::VERSION,
//    'phpVersion' => PHP_VERSION,
//  ]);
//});

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard', [
    "title" => "Dashboard",
  ]);
})->middleware(['auth', 'verified'])->name('dashboard');


//Route::resource('users', UserController::class);
//Route::resource('projects', ProjectController::class);
//Route::resource('projects.bugs', BugController::class);

Route::middleware('auth')->group(function () {
  Route::resource('profile', ProfileController::class);
});
 
require __DIR__ . '/auth.php';
