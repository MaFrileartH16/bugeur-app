<?php

use App\Http\Controllers\BugController;
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
      ? Project::withTrashed()->get()->unique('id') // Pastikan proyek unik
      : Project::withTrashed()->whereHas('workingOn', function ($query) use ($user) {
        $query->where('user_id', $user->id);
      })->get()->unique('id');

// Proses data proyek
    $projectsData = [
      'total' => $projects->count(), // Total proyek unik
      'details' => collect(range(
        $projects->min('created_at')->format('Y'), // Tahun pertama proyek
        now()->format('Y') // Tahun sekarang
      ))->reverse()->mapWithKeys(function ($year) use ($projects) {
        $projectsByYear = $projects->filter(function ($project) use ($year) {
          return $project->created_at->format('Y') == $year;
        })->unique('id');

        // Total per tahun
        $totalByYear = $projectsByYear->count();

        return [
          $year => [
            'total' => $totalByYear, // Tambahkan total proyek per tahun
            'months' => collect(range(1, 12))->mapWithKeys(function ($month) use ($projectsByYear) {
              $monthName = date('F', mktime(0, 0, 0, $month, 1));
              $projectsByMonth = $projectsByYear->filter(function ($project) use ($month) {
                return $project->created_at->month == $month;
              })->unique('id');

              // Total per bulan
              $totalByMonth = $projectsByMonth->count();

              return [
                $monthName => [
                  'total' => $totalByMonth, // Tambahkan total proyek per bulan
                  'Active' => $projectsByMonth->whereNull('deleted_at')->count(),
                  'Inactive' => $projectsByMonth->whereNotNull('deleted_at')->count(),
                ],
              ];
            }),
          ],
        ];
      })->sortKeysDesc(),
    ];


    $users = [
      'total' => User::withTrashed()->where('role', '!=', 'Admin')->count(), // Semua pengguna termasuk yang soft deleted
      'details' => [
        'Project Manager' => [
          'Active' => User::where('role', 'project_manager')
            ->whereNull('deleted_at') // Hanya yang aktif
            ->count(),
          'Inactive' => User::withTrashed()
            ->where('role', 'project_manager')
            ->whereNotNull('deleted_at') // Hanya yang soft deleted
            ->count(),
        ],
        'Developer' => [
          'Active' => User::where('role', 'developer')
            ->whereNull('deleted_at')
            ->count(),
          'Inactive' => User::withTrashed()
            ->where('role', 'developer')
            ->whereNotNull('deleted_at')
            ->count(),
        ],
        'Quality Assurance' => [
          'Active' => User::where('role', 'quality_assurance')
            ->whereNull('deleted_at')
            ->count(),
          'Inactive' => User::withTrashed()
            ->where('role', 'quality_assurance')
            ->whereNotNull('deleted_at')
            ->count(),
        ],
      ],
    ];


    return Inertia::render('Dashboard', [
      'title' => 'Dashboard',
      'notification' => session()->pull('notification'),
      'users' => $users,
      'projects' => $projectsData,
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
