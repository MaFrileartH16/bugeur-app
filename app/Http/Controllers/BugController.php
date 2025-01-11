<?php

namespace App\Http\Controllers;

use App\Models\Bug;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

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

    return Inertia::render('Bugs/Index', [
      'project' => $project,
      'bugs' => $bugs,
    ]);
  }

  /**
   * Store a newly created bug in storage.
   */
  public function store(Request $request, Project $project)
  {
    $request->validate([
      'title' => 'required|string|max:255',
      'description' => 'required|string',
      'assignee_id' => 'nullable|exists:users,id',
      'status' => 'required|in:open,in_progress,resolved,closed',
      'bug_type' => 'required|in:critical,major,minor',
      'screenshots.*' => 'nullable|image|max:2048',
    ]);

    $creatorId = auth()->id();

    if (!$creatorId) {
      return redirect()->back()->withErrors(['creator_id' => 'No authenticated user found']);
    }

    $bug = $project->bugs()->create([
      'title' => $request->title,
      'description' => $request->description,
      'assignee_id' => $request->assignee_id,
      'creator_id' => $creatorId,
      'status' => $request->status,
      'deadline' => $request->deadline,
      'bug_type' => $request->bug_type,
    ]);

    if ($request->hasFile('screenshots')) {
      foreach ($request->file('screenshots') as $file) {
        $path = $file->store('screenshots', 'public');
        $bug->screenshots()->create(['path' => $path]);
      }
    }

    return redirect()->route('projects.bugs.index', $project->id)->with('success', 'Bug created successfully.');
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

  public function destroy(Bug $bug)
  {
    $bug->delete();

    return redirect()->route('projects.bugs.index', $bug->project_id)->with('success', 'Bug deleted successfully.');
  }

}
