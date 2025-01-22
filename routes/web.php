<?php

use App\Http\Controllers\BugController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Models\Bug;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');
Route::middleware('auth')->group(function () {
  Route::get('/dashboard', function () {
    $user = auth()->user();

    // Ambil proyek berdasarkan peran pengguna
    $projects = $user->role === 'Admin'
      ? Project::all()
      : Project::whereHas('workingOn', function ($query) use ($user) {
        $query->where('user_id', $user->id);
      })->get();

    // Hitung total bugs berdasarkan peran pengguna
    $total_bugs = match ($user->role) {
      'Admin' => Bug::count(),
      'Quality Assurance' => Bug::where('creator_id', $user->id)->count(),
      'Developer' => Bug::where('assignee_id', $user->id)->count(),
      default => 0,
    };

    // Data proyek dikelompokkan berdasarkan Tahun, Bulan, dan Hari
    $projectData = $user->role === 'Admin'
      ? [
        'Year' => Project::selectRaw('YEAR(created_at) as year, COUNT(*) as count')
          ->groupBy('year')
          ->orderBy('year')
          ->pluck('count', 'year')
          ->toArray(),

        'Month' => Project::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count")
          ->groupBy('month')
          ->orderBy('month')
          ->pluck('count', 'month')
          ->toArray(),

        'Day' => Project::selectRaw("DATE_FORMAT(created_at, '%Y-%m-%d') as day, COUNT(*) as count")
          ->groupBy('day')
          ->orderBy('day')
          ->pluck('count', 'day')
          ->toArray(),
      ]
      : [];

    // Data pengguna untuk chart (hanya untuk Admin)
    $userData = $user->role === 'Admin'
      ? User::selectRaw('role, COUNT(*) as Users')
        ->where('role', '!=', 'Admin')
        ->groupBy('role')
        ->get()
      : [];

    return Inertia::render('Dashboard', [
      'title' => 'Dashboard',
      'notification' => session()->pull('notification'),
      'total_users' => $user->role === 'Admin' ? User::where('role', '!=', 'Admin')->count() : 0,
      'total_projects' => $projects->count(),
      'total_bugs' => $total_bugs,
      'projectData' => $projectData,
      'userData' => $userData,
    ]);
  })->name('dashboard');


  Route::resource('users', UserController::class);
  Route::resource('projects', ProjectController::class);
  Route::resource('projects.bugs', BugController::class);

  Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Rute untuk autentikasi
require __DIR__ . '/auth.php';
