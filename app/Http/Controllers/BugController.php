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
        // Jika path tidak dimulai dengan "http" atau "https"
        if (substr($screenshot->images, 0, 4) !== 'http') {
          $screenshot->path = asset('storage/' . $screenshot->images);
        }
      });
    });


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
    $data = $request->all();

    // Konversi deadline ke format Y-m-d
    if (!empty($data['deadline'])) {
      $data['deadline'] = date('Y-m-d', strtotime($data['deadline']));
    } else {
      $data['deadline'] = null; // Atur ke null jika tidak ada nilai
    }

    $data['project_id'] = $project->id;

    $bug = Bug::create($data);

    // Simpan screenshots jika ada
    if ($request->hasFile('screenshots')) {
      foreach ($request->file('screenshots') as $file) {
        $path = $file->store('screenshots', 'public');
        $bug->screenshots()->create(['images' => $path]);
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

  /**
   * Remove the specified bug from storage.
   */
  public function destroy(Bug $bug)
  {
    // Hapus semua screenshot terkait
    foreach ($bug->screenshots as $screenshot) {
      Storage::disk('public')->delete($screenshot->path);
    }

    $bug->delete();

    return redirect()->route('projects.bugs.index', $bug->project_id)->with('success', 'Bug deleted successfully.');
  }
}
