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
    try {
      $user = auth()->user();

      // Ambil proyek berdasarkan peran pengguna
      $projects = $user->role === 'Admin'
        ? Project::withTrashed()->get()->unique('id') // Pastikan proyek unik
        : Project::withTrashed()->whereHas('workingOn', function ($query) use ($user) {
          $query->where('user_id', $user->id);
        })->get()->unique('id');

//
//      // Proses data proyek
      $projectsData = [
        'total' => $projects->count() ?? 0, // Total proyek unik, default 0
        'details' => $projects->isEmpty() // Periksa apakah proyek kosong
          ? [
            now()->format('Y') => [ // Tahun sekarang
              'total' => 0, // Total proyek per tahun
              'months' => collect(range(1, 12))->mapWithKeys(function ($month) {
                $monthName = date('F', mktime(0, 0, 0, $month, 1));
                return [
                  $monthName => [
                    'Total' => 0, // Total proyek per bulan
                    'Active' => 0,
                    'Inactive' => 0,
                  ],
                ];
              }),
            ],
          ]
          : collect(range(
            $projects->min('created_at')->format('Y') ?? now()->format('Y'), // Tahun pertama proyek, default ke tahun sekarang
            now()->format('Y') // Tahun sekarang
          ))->reverse()->mapWithKeys(function ($year) use ($projects) {
            $projectsByYear = $projects->filter(function ($project) use ($year) {
              return $project->created_at->format('Y') == $year;
            })->unique('id');

            // Total per tahun
            $totalByYear = $projectsByYear->count() ?? 0;

            return [
              $year => [
                'total' => $totalByYear, // Tambahkan total proyek per tahun
                'months' => collect(range(1, 12))->mapWithKeys(function ($month) use ($projectsByYear) {
                  $monthName = date('F', mktime(0, 0, 0, $month, 1));
                  $projectsByMonth = $projectsByYear->filter(function ($project) use ($month) {
                    return $project->created_at->month == $month;
                  })->unique('id');

                  // Total per bulan
                  $totalByMonth = $projectsByMonth->count() ?? 0;

                  return [
                    $monthName => [
                      'Total' => $totalByMonth, // Tambahkan total proyek per bulan
                      'Active' => $projectsByMonth->whereNull('deleted_at')->count() ?? 0,
                      'Inactive' => $projectsByMonth->whereNotNull('deleted_at')->count() ?? 0,
                    ],
                  ];
                }),
              ],
            ];
          })->sortKeysDesc(),
      ];


      // Proses data pengguna
      $users = [
        'total' => User::withTrashed()->where('role', '!=', 'Admin')->count() ?? 0, // Semua pengguna termasuk yang soft deleted
        'details' => [
          'Project Manager' => [
            'Active' => $activeProjectManager = User::where('role', 'project_manager')
              ->whereNull('deleted_at') // Hanya yang aktif
              ->count() ?? 0,
            'Inactive' => $inactiveProjectManager = User::withTrashed()
              ->where('role', 'project_manager')
              ->whereNotNull('deleted_at') // Hanya yang soft deleted
              ->count() ?? 0,
            'Total' => ($activeProjectManager + $inactiveProjectManager) ?? 0, // Total per role
          ],
          'Developer' => [
            'Active' => $activeDeveloper = User::where('role', 'developer')
              ->whereNull('deleted_at')
              ->count() ?? 0,
            'Inactive' => $inactiveDeveloper = User::withTrashed()
              ->where('role', 'developer')
              ->whereNotNull('deleted_at')
              ->count() ?? 0,
            'Total' => ($activeDeveloper + $inactiveDeveloper) ?? 0, // Total per role
          ],
          'Quality Assurance' => [
            'Active' => $activeQA = User::where('role', 'quality_assurance')
              ->whereNull('deleted_at')
              ->count() ?? 0,
            'Inactive' => $inactiveQA = User::withTrashed()
              ->where('role', 'quality_assurance')
              ->whereNotNull('deleted_at')
              ->count() ?? 0,
            'Total' => ($activeQA + $inactiveQA) ?? 0, // Total per role
          ],
        ],
      ];
      return Inertia::render('Dashboard', [
        'title' => 'Dashboard',
        'notification' => session()->pull('notification'),
        'users' => $users,
        'projects' => $projectsData,
      ]);
    } catch (Exception $e) {
      return Inertia::render('Dashboard', [
        'title' => 'Dashboard',
        'notification' => session()->pull('notification'),
        'users' => [
          'total' => 0,
          'details' => [],
        ],
        'projects' => [
          'total' => 0,
          'details' => [],
        ],
        'error' => $e, // Kirim pesan error
      ]);
    }
  })->name('dashboard');


  Route::resource('users', UserController::class);
  Route::patch('users/{user}/restore', [UserController::class, 'restore'])->name('users.restore');
  Route::resource('projects', ProjectController::class);
  Route::resource('projects.bugs', BugController::class);

  Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Rute untuk autentikasi
require __DIR__ . '/auth.php';
