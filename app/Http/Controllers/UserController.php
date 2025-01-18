<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
  /**
   * Display a listing of the users.
   */
  public function index(): Response
  {
    // Define cache key
    $cacheKey = 'users_index_page_' . request('page', 1);

    // Retrieve users from cache or database
    $users = cache()->remember($cacheKey, now()->addMinutes(10), function () {
      return User::where('role', '!=', 'admin')
        ->orderBy('full_name', 'asc')
        ->paginate(16); // Set pagination per page
    });

    // Return Inertia response
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
    User::create([
      'full_name' => $request->full_name,
      'email' => $request->email,
      'role' => $request->role,
      'password' => Hash::make($request->password),
    ]);

    // Clear cache for all pages
    $this->clearCache();

    return redirect()->route('users.index', ['page' => 1])->with('notification', [
      'status' => 'success',
      'title' => 'User Created',
      'message' => 'User created successfully.',
    ]);
  }

  /**
   * Show the form for creating a new user.
   */
  public function create()
  {
    return Inertia::render('Users/Create', [
      'title' => 'Create User',
    ]);
  }

  /**
   * Clear cache for all users index pages.
   */
  private function clearCache()
  {
    // Clear cache for all paginated pages
    $page = 1;
    while (Cache::has("users_index_page_$page")) {
      Cache::forget("users_index_page_$page");
      $page++;
    }
  }

  /**
   * Show the form for editing the specified user.
   */
  public function edit(User $user)
  {
    return Inertia::render('Users/Edit', [
      'title' => 'Edit User',
      'user' => $user,
    ]);
  }

  /**
   * Update the specified user in storage.
   */
  public function update(Request $request, User $user)
  {
    $user->update($request->only(['full_name', 'email', 'role']));

    // Clear cache for all pages
    $this->clearCache();

    return redirect()->route('users.index', ['page' => 1])->with('notification', [
      'status' => 'success',
      'title' => 'User Updated',
      'message' => 'User updated successfully.',
    ]);
  }

  /**
   * Remove the specified user from storage.
   */
  public function destroy(User $user)
  {
    $user->delete();

    // Clear cache for all pages
    $this->clearCache();

    return redirect()->route('users.index', ['page' => 1])->with('notification', [
      'status' => 'success',
      'title' => 'User Deleted',
      'message' => 'User deleted successfully.',
    ]);
  }
}
