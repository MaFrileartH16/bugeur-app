<?php

namespace App\Http\Controllers;

use App\Models\Bug;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BugController extends Controller
{
  /**
   * Display a listing of bugs for a specific project.
   */
  public function index(Project $project)
  {
    $bugs = Bug::with(['assignee', 'screenshots'])
      ->where('project_id', $project->id)
      ->get();

    // Proses URL screenshots
    $bugs->each(function ($bug) {
      $bug->screenshots->each(function ($screenshot) {
        if (substr($screenshot->images, 0, 4) !== 'http') {
          $screenshot->images = asset('storage/' . $screenshot->images);
        }
      });
    });

    return Inertia::render('Bugs/Index', [
      'project' => $project,
      'bugs' => $bugs,
    ]);
  }

  /**
   * Show the form for editing the specified bug.
   */
  public function edit(Project $project, Bug $bug)
  {
    $users = User::all();

    return Inertia::render('Bugs/Edit', [
      'project' => $project,
      'bug' => $bug,
      'users' => $users,
    ]);
  }

  /**
   * Update the specified bug in storage.
   */
  public function update(Request $request, Project $project, Bug $bug)
  {
    $data = $request->validate([
      'title' => 'required|string|max:255',
      'description' => 'required|string',
      'assignee_id' => 'nullable|exists:users,id',
      'status' => 'required|in:open,in_progress,resolved,closed',
      'deadline' => 'nullable|date',
      'bug_type' => 'required|in:critical,major,minor',
      'screenshots.*' => 'nullable|image|max:2048',
    ]);

    // Update data bug
    $bug->update($data);

    // Jika ada file screenshot baru
    if ($request->hasFile('screenshots')) {
      // Hapus semua screenshot lama
      foreach ($bug->screenshots as $screenshot) {
        Storage::disk('public')->delete($screenshot->images); // Hapus file fisik
      }
      $bug->screenshots()->delete(); // Hapus data dari database

      // Simpan screenshot baru
      foreach ($request->file('screenshots') as $file) {
        $path = $file->store('screenshots', 'public');
        $bug->screenshots()->create(['images' => $path]);
      }
    }

    return redirect()
      ->route('projects.bugs.index', $project->id)
      ->with('success', 'Bug updated successfully.');
  }

  /**
   * Store a newly created bug in storage.
   */
  public function store(Request $request, Project $project)
  {
    $data = $request->validate([
      'title' => 'required|string|max:255',
      'description' => 'required|string',
      'assignee_id' => 'nullable|exists:users,id',
      'status' => 'required|in:open,in_progress,resolved,closed',
      'deadline' => 'nullable|date',
      'creator_id' => 'required|exists:users,id',
      'bug_type' => 'required|in:critical,major,minor',
      'screenshots.*' => 'nullable|image|max:2048',
    ]);

    $data['project_id'] = $project->id;

    // Konversi deadline ke format Y-m-d
    if (!empty($data['deadline'])) {
      $data['deadline'] = date('Y-m-d', strtotime($data['deadline']));
    }

    $bug = Bug::create($data);

    // Simpan screenshots jika ada
    if ($request->hasFile('screenshots')) {
      foreach ($request->file('screenshots') as $file) {
        $path = $file->store('screenshots', 'public');
        $bug->screenshots()->create(['images' => $path]);
      }
    }

    return redirect()
      ->route('projects.bugs.index', $project->id)
      ->with('success', 'Bug created successfully.');
  }


  /**
   * Show the form for creating a new bug.
   */
  public function create(Project $project)
  {
    $users = User::all();

    return Inertia::render('Bugs/Create', [
      'project' => $project,
      'users' => $users,
    ]);
  }

  /**
   * Remove the specified bug from storage.
   */
  public function destroy(Project $project, Bug $bug)
  {
    // Hapus semua screenshot terkait
    foreach ($bug->screenshots as $screenshot) {
      Storage::disk('public')->delete($screenshot->images); // Hapus file fisik
    }

    $bug->screenshots()->delete(); // Hapus data dari database
    $bug->delete(); // Hapus bug

    return redirect()
      ->route('projects.bugs.index', $project->id)
      ->with('success', 'Bug deleted successfully.');
  }

}
