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
    $cacheKey = $this->getCacheKey();

    try {
      $users = cache()->remember($cacheKey, now()->addMinutes(10), function () {
        return $this->getUsers();
      });

      return Inertia::render('Users/Index', [
        'title' => 'Users',
        'users' => $users,
        'search' => request('search'),
        'sort_key' => request('sort_key'),
        'sort_direction' => request('sort_direction'),
        'filter_key' => request('filter_key'),
        'filter_value' => request('filter_value'),
        'per_page' => request('per_page', 10),
        'notification' => session()->pull('notification'),
      ]);
    } catch (Throwable $e) {
      return Inertia::render('Users/Index', [
        'title' => 'Users',
        'users' => [],
        'search' => request('search'),
        'sort_key' => request('sort_key'),
        'sort_direction' => request('sort_direction'),
        'filter_key' => request('filter_key'),
        'filter_value' => request('filter_value'),
        'per_page' => request('per_page', 10),
        'notification' => [
          'status' => 'error',
          'title' => 'Error',
          'message' => 'An error occurred while fetching user data. Please try again later.',
        ],
      ]);
    }
  }

  /**
   * Generate a cache key based on request parameters.
   */
  private function getCacheKey(): string
  {
    return 'users_index_page_' . request('page', 1) .
      '_search_' . request('search') .
      '_sort_' . request('sort_key') .
      '_direction_' . request('sort_direction') .
      '_filter_key_' . request('filter_key') .
      '_filter_value_' . request('filter_value') .
      '_per_page_' . request('per_page', 10);
  }

  /**
   * Get users data based on filters, sorting, and pagination.
   */
  private function getUsers()
  {
    $query = User::withTrashed()->where('role', '!=', 'admin');

    if (request('search')) {
      $query->where(function ($q) {
        $q->where('full_name', 'like', '%' . request('search') . '%')
          ->orWhere('email', 'like', '%' . request('search') . '%');
      });
    }

    if (request('filter_key') && request('filter_value')) {
      $filterKey = request('filter_key');
      $filterValue = request('filter_value');

      if ($filterKey === 'role') {
        $role = str_replace(' ', '_', strtolower($filterValue));
        $query->where('role', $role);
      } elseif ($filterKey === 'status') {
        if ($filterValue === 'active') {
          $query->whereNull('deleted_at');
        } elseif ($filterValue === 'inactive') {
          $query->whereNotNull('deleted_at');
        }
      }
    }

    if (request('sort_key') && request('sort_direction')) {
      $query->orderBy(request('sort_key'), request('sort_direction'));
    } else {
      $query->orderBy('full_name', 'asc');
    }

    return $query->paginate(request('per_page', 10));
  }

  /**
   * Store a newly created user in storage.
   */
  public function store(Request $request): RedirectResponse
  {
    try {
      User::create([
        'full_name' => $request->full_name,
        'email' => $request->email,
        'role' => $request->role,
        'password' => bcrypt($request->password),
      ]);

      $this->refreshCache(); // Refresh cache after creating a user

      return redirect()->route('users.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'User Created',
        'message' => 'User created successfully.',
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
   * Show the form for creating a new user.
   */
  public function create(): Response
  {
    return Inertia::render('Users/Create', [
      'title' => 'Create User',
    ]);
  }

  /**
   * Refresh the cache for all users index pages.
   */
  private function refreshCache(): void
  {
    $page = 1;
    while (Cache::has($this->getCacheKey())) {
      $cacheKey = $this->getCacheKey();
      Cache::forget($cacheKey); // Clear old cache
      Cache::remember($cacheKey, now()->addMinutes(10), function () {
        return $this->getUsers(); // Refresh with new data
      });
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
        'notification' => session()->pull('notification'),
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
   * Update the specified user in storage.
   */
  public function update(Request $request, User $user): RedirectResponse
  {
    try {
      $updateData = $request->all();

      if (isset($updateData['password']) && !empty($updateData['password'])) {
        $updateData['password'] = $updateData['password']; // Hash password
      } else {
        unset($updateData['password']);
      }

      $user->update($updateData);

      $this->refreshCache(); // Refresh cache after updating a user

      return redirect()->route('users.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'User Updated',
        'message' => 'User updated successfully.',
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
   * Remove the specified user from storage.
   */
  public function destroy(User $user): RedirectResponse
  {
    try {
      $user = User::withTrashed()->findOrFail($user->id);

      if ($user->deleted_at === null) {
        $user->delete();
        $message = 'User soft deleted successfully.';
      } else {
        $user->restore();
        $message = 'User restored successfully.';
      }

      $this->refreshCache(); // Refresh cache after deleting/restoring a user

      return redirect()->route('users.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'User Updated',
        'message' => $message,
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
