<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
  /**
   * Display a listing of the projects.
   */
  public function index(): Response
  {
    $page = request('page', 1);
    $cacheKey = "projects_index_page_$page";

    $projects = Cache::remember($cacheKey, now()->addMinutes(10), function () {
      return Project::with(['manager', 'workingOn', 'bugs'])
        ->orderBy('created_at', 'desc')
        ->paginate(16);
    });

    return Inertia::render('Projects/Index', [
      'title' => 'Projects',
      'projects' => $projects,
      'notification' => session()->pull('notification'),
    ]);
  }

  /**
   * Store a newly created project in storage.
   */
  /**
   * Store a newly created project in storage.
   */
  public function store(Request $request): RedirectResponse
  {
    // Validasi input
    $request->validate([
      'title' => 'required|string|max:255',
      'description' => 'required|string',
      'manager_id' => 'required|exists:users,id',
      'team_members' => 'required|array|min:1', // Validasi array anggota tim
      'team_members.*' => 'exists:users,id', // Validasi setiap ID di array anggota tim
    ]);

    try {
      // Simpan data project ke tabel projects
      $project = Project::create([
        'title' => $request->title,
        'description' => $request->description,
        'manager_id' => $request->manager_id,
      ]);

      // Simpan anggota tim ke tabel working_on
      $project->workingOn()->attach($request->team_members, [
        'assigned_at' => now(),
      ]);

      // Hapus cache
      $this->clearCache();

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
    $managers = User::where('role', 'project_manager')->get();

    // Ambil semua pengguna kecuali Admin dan Project Manager
    $users = User::whereNotIn('role', ['admin', 'project_manager'])->get();

    return Inertia::render('Projects/Create', [
      'title' => 'Create Project',
      'managers' => $managers,
      'users' => $users,
    ]);
  }


  /**
   * Clear cache for all project index pages.
   */
  private function clearCache(): void
  {
    $page = 1;
    while (Cache::has("projects_index_page_$page")) {
      Cache::forget("projects_index_page_$page");
      $page++;
    }
  }

  /**
   * Remove the specified project from storage.
   */
  public function destroy(Project $project): RedirectResponse
  {
    try {
      $project->delete();

      $this->clearCache();

      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'Project Deleted',
        'message' => 'Project deleted successfully.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'error',
        'title' => 'Project Deletion Failed',
        'message' => 'An error occurred while deleting the project.',
      ]);
    }
  }

  /**
   * Show the form for editing the specified project.
   */
  public function edit(Project $project): Response
  {
    $managers = User::where('role', 'project_manager')->get();

    // Ambil semua pengguna kecuali Admin dan Project Manager
    $users = User::whereNotIn('role', ['admin', 'project_manager'])->get();

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
    // Validasi input
    $request->validate([
      'title' => 'required|string|max:255',
      'description' => 'required|string',
      'manager_id' => 'required|exists:users,id',
      'team_members' => 'required|array|min:1', // Validasi array anggota tim
      'team_members.*' => 'exists:users,id', // Validasi setiap ID di array anggota tim
    ]);

    try {
      // Update data proyek
      $project->update([
        'title' => $request->title,
        'description' => $request->description,
        'manager_id' => $request->manager_id,
      ]);

      // Update anggota tim (sync untuk mengganti relasi existing)
      $project->workingOn()->sync($request->team_members);

      // Hapus cache
      $this->clearCache();

      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'Project Updated',
        'message' => 'Project and team members updated successfully.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('projects.index', ['page' => 1])->with('notification', [
        'status' => 'error',
        'title' => 'Project Update Failed',
        'message' => 'An error occurred while updating the project.',
      ]);
    }
  }

  /**
   * Display the specified project details.
   */
  public function show(Project $project): Response
  {
    // Load relasi manager, workingOn (anggota tim), dan bugs
    $project->load(['manager', 'workingOn',  'bugs.assignee',]);

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


}
