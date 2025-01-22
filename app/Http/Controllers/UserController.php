<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class UserController extends Controller
{
  /**
   * Display a listing of the users.
   */
  public function index(): Response
  {
    $cacheKey = 'users_index_page_' . request('page', 1);

    $users = cache()->remember($cacheKey, now()->addMinutes(10), function () {
      return User::where('role', '!=', 'admin')
        ->orderBy('full_name', 'asc')
        ->paginate(16);
    });

    return Inertia::render('Users/Index', [
      'title' => 'Users',
      'users' => $users,
      'notification' => session()->pull('notification'),
    ]);
  }

  /**
   * Store a newly created user in storage.
   */
  public function store(Request $request)
  {
    try {
      User::create([
        'full_name' => $request->full_name,
        'email' => $request->email,
        'role' => $request->role,
        'password' => $request->password,
      ]);

      $this->clearCache();

      return redirect()->route('users.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'User Created',
        'message' => 'User created successfully.',
      ]);
    } catch (Throwable $e) {
      return back()->with('notification', [
        'status' => 'error',
        'title' => 'Error',
        'message' => $e
      ]);
    }
  }

  /**
   * Show the form for creating a new user.
   */
  public function create(): Response
  {
    return Inertia::render('Users/Create', [
      'title' => 'Create User',
    ]);
  }

  /**
   * Clear cache for all users index pages.
   */
  private function clearCache(): void
  {
    $page = 1;
    while (Cache::has("users_index_page_$page")) {
      Cache::forget("users_index_page_$page");
      $page++;
    }
  }

  /**
   * Show the form for editing the specified user.
   */
  public function edit(User $user): Response|RedirectResponse
  {
    try {
      return Inertia::render('Users/Edit', [
        'title' => 'Edit User',
        'user' => $user,
      ]);
    } catch (Throwable $e) {
      return back()->with('notification', [
        'status' => 'error',
        'title' => 'Error',
        'message' => $e
      ]);
    }
  }

  /**
   * Update the specified user in storage.
   */
  public function update(Request $request, User $user): RedirectResponse
  {
    try {
      $user->update($request->only(['full_name', 'email', 'role']));

      $this->clearCache();

      return redirect()->route('users.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'User Updated',
        'message' => 'User updated successfully.',
      ]);
    } catch (Throwable $e) {
      return back()->with('notification', [
        'status' => 'error',
        'title' => 'Error',
        'message' => $e
      ]);
    }
  }

  /**
   * Remove the specified user from storage.
   */
  public function destroy(User $user): RedirectResponse
  {
    try {
      $user->delete();

      $this->clearCache();

      return redirect()->route('users.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'User Deleted',
        'message' => 'User deleted successfully.',
      ]);
    } catch (Throwable $e) {
      return back()->with('notification', [
        'status' => 'error',
        'title' => 'Error',
        'message' => $e
      ]);
    }
  }
}
