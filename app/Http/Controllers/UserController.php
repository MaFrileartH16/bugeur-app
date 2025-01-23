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
    $cacheKey = 'users_index_page_' . request('page', 1) . '_search_' . request('search') . '_sort_' . request('sort_key') . '_direction_' . request('sort_direction') . '_filter_type_' . request('filter_type') . '_filter_value_' . request('filter_value') . '_per_page_' . request('per_page', 10);

    $users = cache()->remember($cacheKey, now()->addMinutes(10), function () {
      $query = User::withTrashed()->where('role', '!=', 'admin'); // Mengambil data termasuk soft deleted

      // Filter berdasarkan pencarian
      if (request('search')) {
        $query->where(function ($q) {
          $q->where('full_name', 'like', '%' . request('search') . '%')
            ->orWhere('email', 'like', '%' . request('search') . '%');
        });
      }

      // Filter berdasarkan tipe filter
      if (request('filter_type') && request('filter_value')) {
        if (request('filter_type') === 'role') {
          $query->where('role', request('filter_value')); // Filter berdasarkan role
        } elseif (request('filter_type') === 'status') {
          if (request('filter_value') === 'active') {
            $query->whereNull('deleted_at'); // Hanya data yang aktif
          } elseif (request('filter_value') === 'inactive') {
            $query->whereNotNull('deleted_at'); // Hanya data yang tidak aktif
          }
        }
      }

      // Sorting
      if (request('sort_key') && request('sort_direction')) {
        $query->orderBy(request('sort_key'), request('sort_direction'));
      } else {
        $query->orderBy('full_name', 'asc'); // Default sorting
      }

      // Pagination dengan custom per_page
      return $query->paginate(request('per_page', 10));
    });

    return Inertia::render('Users/Index', [
      'title' => 'Users',
      'users' => $users,
      'search' => request('search'), // Kirim parameter search ke frontend
      'sort_key' => request('sort_key'), // Kirim parameter sort_key ke frontend
      'sort_direction' => request('sort_direction'), // Kirim parameter sort_direction ke frontend
      'filter_type' => request('filter_type'), // Kirim parameter filter_type ke frontend
      'filter_value' => request('filter_value'), // Kirim parameter filter_value ke frontend
      'per_page' => request('per_page', 10), // Kirim parameter per_page ke frontend
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
