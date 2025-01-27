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
    try {
      $user = auth()->user();

      // Ambil data proyek berdasarkan peran pengguna
      $projects = $user->role === 'Admin'
        ? Project::withTrashed()->get()->unique('id')
        : ($user->role === 'Project Manager'
          ? Project::withTrashed()->where('manager_id', $user->id)->get()->unique('id')
          : Project::withTrashed()->whereHas('workingOn', function ($query) use ($user) {
            $query->where('user_id', $user->id);
          })->get()->unique('id'));

      // Ambil data bugs berdasarkan peran pengguna
      $bugs = match ($user->role) {
        'Admin' => Bug::withTrashed()->get()->unique('id'),
        'Project Manager' => Bug::withTrashed()->whereHas('project', function ($query) use ($user) {
          $query->where('manager_id', $user->id);
        })->get()->unique('id'),
        'Developer' => Bug::withTrashed()->where('assignee_id', $user->id)->get()->unique('id'),
        'Quality Assurance' => Bug::withTrashed()->where('creator_id', $user->id)->get()->unique('id'),
        default => collect(),
      };
//      dd($bugs);
      // Proses data bugs
      $bugsData = [
        'total' => $bugs->count() ?? 0,
        'details' => $bugs->isEmpty()
          ? [
            now()->format('Y') => [
              'total' => 0,
              'months' => collect(range(1, 12))->mapWithKeys(function ($month) {
                $monthName = date('F', mktime(0, 0, 0, $month, 1));
                return [$monthName => ['Total' => 0]];
              }),
            ],
          ]
          : collect(range(
            $bugs->min('created_at')->format('Y') ?? now()->format('Y'),
            now()->format('Y')
          ))->reverse()->mapWithKeys(function ($year) use ($bugs) {
            $bugsByYear = $bugs->filter(fn($bug) => $bug->created_at->format('Y') == $year)->unique('id');
            return [
              $year => [
                'total' => $bugsByYear->count(),
                'months' => collect(range(1, 12))->mapWithKeys(function ($month) use ($bugsByYear) {
                  $monthName = date('F', mktime(0, 0, 0, $month, 1));
                  $bugsByMonth = $bugsByYear->filter(fn($bug) => $bug->created_at->month == $month)->unique('id');
                  return [$monthName => ['Total' => $bugsByMonth->count()]];
                }),
              ],
            ];
          })->sortKeysDesc(),
      ];

      // Proses data proyek
      $projectsData = [
        'total' => $projects->count() ?? 0,
        'details' => $projects->isEmpty()
          ? [
            now()->format('Y') => [
              'total' => 0,
              'months' => collect(range(1, 12))->mapWithKeys(function ($month) {
                $monthName = date('F', mktime(0, 0, 0, $month, 1));
                return [$monthName => ['Total' => 0, 'Active' => 0, 'Inactive' => 0]];
              }),
            ],
          ]
          : collect(range(
            $projects->min('created_at')->format('Y') ?? now()->format('Y'),
            now()->format('Y')
          ))->reverse()->mapWithKeys(function ($year) use ($projects) {
            $projectsByYear = $projects->filter(fn($project) => $project->created_at->format('Y') == $year)->unique('id');
            return [
              $year => [
                'total' => $projectsByYear->count(),
                'months' => collect(range(1, 12))->mapWithKeys(function ($month) use ($projectsByYear) {
                  $monthName = date('F', mktime(0, 0, 0, $month, 1));
                  $projectsByMonth = $projectsByYear->filter(fn($project) => $project->created_at->month == $month)->unique('id');
                  return [
                    $monthName => [
                      'Total' => $projectsByMonth->count(),
                      'Active' => $projectsByMonth->whereNull('deleted_at')->count(),
                      'Inactive' => $projectsByMonth->whereNotNull('deleted_at')->count(),
                    ],
                  ];
                }),
              ],
            ];
          })->sortKeysDesc(),
      ];

      // Proses data pengguna
      $users = [
        'total' => User::withTrashed()->where('role', '!=', 'Admin')->count() ?? 0,
        'details' => [
          'Project Manager' => [
            'Active' => $activeProjectManager = User::where('role', 'Project Manager')->whereNull('deleted_at')->count() ?? 0,
            'Inactive' => $inactiveProjectManager = User::withTrashed()->where('role', 'Project Manager')->whereNotNull('deleted_at')->count() ?? 0,
            'Total' => $activeProjectManager + $inactiveProjectManager,
          ],
          'Developer' => [
            'Active' => $activeDeveloper = User::where('role', 'Developer')->whereNull('deleted_at')->count() ?? 0,
            'Inactive' => $inactiveDeveloper = User::withTrashed()->where('role', 'Developer')->whereNotNull('deleted_at')->count() ?? 0,
            'Total' => $activeDeveloper + $inactiveDeveloper,
          ],
          'Quality Assurance' => [
            'Active' => $activeQA = User::where('role', 'Quality Assurance')->whereNull('deleted_at')->count() ?? 0,
            'Inactive' => $inactiveQA = User::withTrashed()->where('role', 'Quality Assurance')->whereNotNull('deleted_at')->count() ?? 0,
            'Total' => $activeQA + $inactiveQA,
          ],
        ],
      ];

      return Inertia::render('Dashboard', [
        'title' => 'Dashboard',
        'notification' => session()->pull('notification'),
        'users' => $users,
        'projects' => $projectsData,
        'bugs' => $bugsData,
      ]);
    } catch (Exception $e) {
      Log::error('Dashboard Error: ' . $e->getMessage());
      return Inertia::render('Dashboard', [
        'title' => 'Dashboard',
        'notification' => session()->pull('notification'),
        'users' => ['total' => 0, 'details' => []],
        'projects' => ['total' => 0, 'details' => []],
        'bugs' => ['total' => 0, 'details' => []],
        'error' => 'Something went wrong. Please try again.',
      ]);
    }
  })->name('dashboard');


  Route::resource('users', UserController::class);
  Route::patch('users/{user}/restore', [UserController::class, 'restore'])->name('users.restore');
  Route::resource('projects', ProjectController::class);
  Route::patch('projects/{project}/restore', [ProjectController::class, 'restore'])->name('projects.restore');
  Route::resource('projects.bugs', BugController::class);

  Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Rute untuk autentikasi
require __DIR__ . '/auth.php';
