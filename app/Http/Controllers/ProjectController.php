<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
  /**
   * Display a listing of the projects.
   */
  public function index()
  {
    $projects = Project::with('manager')->get();

    return Inertia::render('Projects/Index', [
      'title' => 'Projects',
      'projects' => $projects,
    ]);
  }

  /**
   * Store a newly created project in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'title' => 'required|string|max:255',
      'manager_id' => 'required|exists:users,id',
    ]);

    Project::create($request->only('title', 'manager_id'));

    return redirect()->route('projects.index')->with('success', 'Project created successfully.');
  }

  /**
   * Show the form for creating a new project.
   */
  public function create()
  {
    $managers = User::where('user_type', 'project_manager')->get();

    return Inertia::render('Projects/Create', [
      'title' => 'Add Project',
      'managers' => $managers,
    ]);
  }

  /**
   * Remove the specified project from storage.
   */
  public function destroy(Project $project)
  {
    $project->delete();

    return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
  }

  public function edit(Project $project)
  {
    $managers = User::where('user_type', 'project_manager')->get();

    return Inertia::render('Projects/Edit', [
      'title' => 'Edit Project',
      'project' => $project,
      'managers' => $managers,
    ]);
  }

  public function update(Request $request, Project $project)
  {
    $request->validate([
      'title' => 'required|string|max:255',
      'manager_id' => 'required|exists:users,id',
    ]);

    $project->update($request->only('title', 'manager_id'));

    return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
  }

}
