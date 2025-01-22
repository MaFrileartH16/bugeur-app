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
    $bugs = Bug::where('project_id', $project->id)
      ->get();

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
    $data = $request->all();

    // Konversi deadline ke format Y-m-d
    if (!empty($data['deadline'])) {
      $data['deadline'] = date('Y-m-d', strtotime($data['deadline']));
    }

    // Update data bug
    $bug->update($data);

    // Jika ada file screenshot baru
    if ($request->hasFile('screenshots')) {
      // Hapus semua screenshot lama berdasarkan bug_id
      $screenshotPaths = $bug->screenshots()->where('bug_id', $bug->id)->pluck('images');

      foreach ($screenshotPaths as $path) {
        Storage::disk('public')->delete($path); // Hapus file fisik
      }

      // Hapus data screenshot dari database berdasarkan bug_id
      $bug->screenshots()->where('bug_id', $bug->id)->delete();

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
//    dd($request->all());
    $validated = $request->validate([
      'title' => 'required|string|max:255',
      'description' => 'required|string',
      'assignee_id' => 'nullable|exists:users,id',
      'evidence_image' => 'nullable|image|max:2048',
    ]);

    $evidenceImage = null;

    if ($request->hasFile('evidence_image')) {
      $evidenceImage = $request->file('evidence_image')->store('evidence_images', 'public');
    }

    Bug::create([
      'project_id' => $project->id,
      'creator_id' => auth()->id(),
      'assignee_id' => $validated['assignee_id'] ?? null,
      'title' => $validated['title'],
      'description' => $validated['description'],
      'evidence_image' => $evidenceImage,
    ]);

    return redirect()
      ->route('projects.show', $project->id)
      ->with('notification', [
        'status' => 'success',
        'title' => 'Bug Created',
        'message' => 'The bug has been successfully created and assigned.',
      ]);
  }

  /**
   * Show the form for creating a new bug.
   */
  public function create(Project $project)
  {
    $users = User::where('role', 'developer')->get();

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
