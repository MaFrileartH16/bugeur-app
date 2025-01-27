<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ProjectController extends Controller
{
  /**
   * Display a listing of the projects.
   */
  public function index(Request $request)
  {
    try {
      $query = Project::with(['manager', 'workingOn'])
        ->withTrashed(); // Mengikutsertakan data yang di-soft delete

      // Search
      if ($request->query('search')) {
        $query->where(function ($q) use ($request) {
          $q->where('title', 'like', '%' . $request->query('search') . '%')
            ->orWhere('description', 'like', '%' . $request->query('search') . '%');
        });
      }

      // Filter
      if ($request->query('filter_key') && $request->query('filter_value')) {
        $filterKey = $request->query('filter_key');
        $filterValue = $request->query('filter_value');

        if ($filterKey === 'status') {
          if ($filterValue === 'active') {
            $query->whereNull('deleted_at');
          } elseif ($filterValue === 'inactive') {
            $query->whereNotNull('deleted_at');
          }
        }
      }

      // Sort
      if ($request->query('sort_key') && $request->query('sort_direction')) {
        $query->orderBy($request->query('sort_key'), $request->query('sort_direction'));
      } else {
        $query->orderBy('created_at', 'desc'); // Default sorting
      }

      // Pagination
      $projects = $query->paginate($request->query('per_page', 10));

      return Inertia::render('Projects/Index', [
        'title' => 'Projects',
        'projects' => $projects,
        'search' => $request->query('search'),
        'sort_key' => $request->query('sort_key'),
        'sort_direction' => $request->query('sort_direction'),
        'filter_key' => $request->query('filter_key'),
        'filter_value' => $request->query('filter_value'),
        'per_page' => $request->query('per_page', 10),
        'notification' => session()->pull('notification'),
      ]);
    } catch (Throwable $e) {
      return Inertia::render('Projects/Index', [
        'title' => 'Projects',
        'projects' => [],
        'search' => $request->query('search'),
        'sort_key' => $request->query('sort_key'),
        'sort_direction' => $request->query('sort_direction'),
        'filter_key' => $request->query('filter_key'),
        'filter_value' => $request->query('filter_value'),
        'per_page' => $request->query('per_page', 10),
        'notification' => [
          'status' => 'error',
          'title' => 'Error',
          'message' => $e->getMessage(),
        ],
      ]);
    }
  }

  /**
   * Display the specified project details.
   */
  public function show(Project $project): Response
  {
    // Load relasi manager, workingOn (anggota tim), dan bugs
    $project->load(['manager', 'workingOn', 'bugs.assignee']);

    // Proses bugs untuk memastikan evidence_image menggunakan 'storage/'
    $project->bugs = $project->bugs->map(function ($bug) {
      $bug->evidence_image = $bug->evidence_image
        ? (strpos($bug->evidence_image, 'http') === 0 || strpos($bug->evidence_image, 'https') === 0
          ? $bug->evidence_image
          : url('storage/' . $bug->evidence_image))
        : null;

      return $bug;
    });

    return Inertia::render('Projects/Show', [
      'title' => 'Project Details',
      'project' => $project,
    ]);
  }

  /**
   * Show the form for editing the specified project.
   */
  public function edit(Project $project): Response
  {
    $managers = User::where('role', 'Project Manager')->get();

    // Ambil semua pengguna kecuali Admin dan Project Manager
    $users = User::whereNotIn('role', ['Admin', 'Project Manager'])->get();

    // Ambil ID anggota tim yang sudah terkait dengan proyek
    $teamMembers = $project->workingOn()->pluck('user_id')->toArray();

    return Inertia::render('Projects/Edit', [
      'title' => 'Edit Project',
      'project' => $project->load(['manager', 'workingOn']),
      'managers' => $managers,
      'users' => $users,
      'team_members' => $teamMembers, // Pass anggota tim saat ini
    ]);
  }

  /**
   * Update the specified project in storage.
   */
  public function update(Request $request, Project $project): RedirectResponse
  {
    try {
      // Handle file upload
      if ($request->hasFile('cover_photo')) {
        // Jika ada file baru diupload
        // Hapus file lama jika ada
        if ($project->cover_photo_path && Storage::exists($project->cover_photo_path)) {
          Storage::delete($project->cover_photo_path);
        }

        // Simpan file baru
        $coverPhotoPath = $request->file('cover_photo')->store('cover_photos', 'public');
      } elseif ($request->cover_photo === '') {
        // Jika cover_photo adalah string kosong, set cover_photo_path ke null
        if ($project->cover_photo_path && Storage::exists($project->cover_photo_path)) {
          Storage::delete($project->cover_photo_path); // Hapus file lama
        }
        $coverPhotoPath = null;
      } elseif (is_string($request->cover_photo) && strpos($request->cover_photo, 'http://127.0.0.1:8000/storage/') === 0) {
        // Jika cover_photo adalah URL, hapus bagian base URL dan simpan path relatifnya
        $coverPhotoPath = str_replace('http://127.0.0.1:8000/storage/', '', $request->cover_photo);
      } else {
        // Jika tidak ada perubahan, gunakan nilai yang sudah ada
        $coverPhotoPath = $project->cover_photo_path;
      }

      // Update data proyek
      $project->update([
        'title' => $request->title,
        'description' => $request->description,
        'manager_id' => $request->manager_id,
        'cover_photo_path' => $coverPhotoPath, // Update cover_photo_path
      ]);

      // Update anggota tim (sync untuk mengganti relasi existing)
      $project->workingOn()->sync($request->team_members);

      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'Project Updated',
        'message' => 'Project and team members updated successfully.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'error',
        'title' => 'Project Update Failed',
        'message' => $e->getMessage(),
      ]);
    }
  }

  /**
   * Store a newly created project in storage.
   */
  public function store(Request $request): RedirectResponse
  {
    try {
      // Handle file upload
      $coverPhotoPath = null;
      if ($request->hasFile('cover_photo')) {
        $coverPhotoPath = $request->file('cover_photo')->store('cover_photos', 'public');
      }

      // Simpan data project ke tabel projects
      $project = Project::create([
        'cover_photo_path' => $coverPhotoPath,
        'title' => $request->title,
        'description' => $request->description,
        'manager_id' => $request->manager_id,
      ]);

      // Simpan anggota tim ke tabel working_on
      $project->workingOn()->attach($request->team_members, [
        'assigned_at' => now(),
      ]);

      // Redirect dengan notifikasi sukses
      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'Project Created',
        'message' => 'Project and team members saved successfully.',
      ]);
    } catch (Exception $e) {
      // Redirect dengan notifikasi error
      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'error',
        'title' => 'Project Creation Failed',
        'message' => 'An error occurred while creating the project.',
      ]);
    }
  }

  /**
   * Show the form for creating a new project.
   */
  public function create(): Response
  {
    $managers = User::where('role', 'Project Manager')->get();

    // Ambil semua pengguna kecuali Admin dan Project Manager
    $members = User::whereNotIn('role', ['Admin', 'Project Manager'])->get();

    return Inertia::render('Projects/Create', [
      'title' => 'Create Project',
      'managers' => $managers,
      'members' => $members,
    ]);
  }

  /**
   * Remove the specified project from storage.
   */
  public function destroy(Project $project): RedirectResponse
  {
    try {
      $project->delete();

      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'Project Deleted',
        'message' => 'Project soft deleted successfully.',
      ]);
    } catch (Throwable $e) {
      return back()->with('notification', [
        'status' => 'error',
        'title' => 'Error',
        'message' => $e->getMessage(),
      ]);
    }
  }

  /**
   * Restore the specified project from storage.
   */
  public function restore($projectId): RedirectResponse
  {
    try {
      // Cari proyek yang dihapus (soft delete)
      $project = Project::withTrashed()->findOrFail($projectId);

      // Restore proyek jika sudah dihapus
      if ($project->trashed()) {
        $project->restore();
      }

      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'Project Restored',
        'message' => 'Project restored successfully.',
      ]);
    } catch (Throwable $e) {
      return back()->with('notification', [
        'status' => 'error',
        'title' => 'Error',
        'message' => $e->getMessage(),
      ]);
    }
  }
}
