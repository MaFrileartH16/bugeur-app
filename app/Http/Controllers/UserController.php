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
    try {
      // Generate cache key based on request parameters
      $cacheKey = 'users_index_page_' . request('page', 1) .
        'search' . request('search') .
        'sort' . request('sort_key') .
        'direction' . request('sort_direction') .
        'filter_key' . request('filter_key') .
        'filter_value' . request('filter_value') .
        'per_page' . request('per_page', 10);

      // Get users data from cache or database
      $users = Cache::remember($cacheKey, now()->addMinutes(10), function () {
        $query = User::withTrashed()->where('role', '!=', 'admin');

        // Search
        if (request('search')) {
          $query->where(function ($q) {
            $q->where('full_name', 'like', '%' . request('search') . '%')
              ->orWhere('email', 'like', '%' . request('search') . '%');
          });
        }

        // Filter
        if (request('filter_key') && request('filter_value')) {
          $filterKey = request('filter_key');
          $filterValue = request('filter_value');

          if ($filterKey === 'role') {
            $query->where('role', str_replace(' ', '_', strtolower($filterValue)));
          } elseif ($filterKey === 'status') {
            if ($filterValue === 'active') {
              $query->whereNull('deleted_at');
            } elseif ($filterValue === 'inactive') {
              $query->whereNotNull('deleted_at');
            }
          }
        }

        // Sort
        if (request('sort_key') && request('sort_direction')) {
          $query->orderBy(request('sort_key'), request('sort_direction'));
        } else {
          $query->orderBy('full_name', 'asc');
        }

        // Pagination
        return $query->paginate(request('per_page', 10));
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

      // Refresh cache for all users index pages
      $page = 1;
      while (true) {
        $cacheKey = 'users_index_page_' . $page .
          'search' . request('search') .
          'sort' . request('sort_key') .
          'direction' . request('sort_direction') .
          'filter_key' . request('filter_key') .
          'filter_value' . request('filter_value') .
          'per_page' . request('per_page', 10);

        if (!Cache::has($cacheKey)) {
          break;
        }

        Cache::forget($cacheKey); // Clear old cache
        $page++;
      }

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
        $updateData['password'] = bcrypt($updateData['password']); // Hash password
      } else {
        unset($updateData['password']);
      }

      $user->update($updateData);

      // Refresh cache for all users index pages
      $page = 1;
      while (true) {
        $cacheKey = 'users_index_page_' . $page .
          'search' . request('search') .
          'sort' . request('sort_key') .
          'direction' . request('sort_direction') .
          'filter_key' . request('filter_key') .
          'filter_value' . request('filter_value') .
          'per_page' . request('per_page', 10);

        if (!Cache::has($cacheKey)) {
          break;
        }

        Cache::forget($cacheKey); // Clear old cache
        $page++;
      }

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
      $user->delete();

      // Refresh cache for all users index pages
      $page = 1;
      while (true) {
        $cacheKey = 'users_index_page_' . $page .
          'search' . request('search') .
          'sort' . request('sort_key') .
          'direction' . request('sort_direction') .
          'filter_key' . request('filter_key') .
          'filter_value' . request('filter_value') .
          'per_page' . request('per_page', 10);

        if (!Cache::has($cacheKey)) {
          break;
        }

        Cache::forget($cacheKey); // Clear old cache
        $page++;
      }

      return redirect()->route('users.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'User Deleted',
        'message' => 'User soft deleted successfully.',
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
   * Restore the specified user from storage.
   */
  public function restore($userId): RedirectResponse
  {
    try {
      $user = User::withTrashed()->findOrFail($userId);

      if ($user->trashed()) {
        $user->restore();
      }

      // Refresh cache for all users index pages
      $page = 1;
      while (true) {
        $cacheKey = 'users_index_page_' . $page .
          'search' . request('search') .
          'sort' . request('sort_key') .
          'direction' . request('sort_direction') .
          'filter_key' . request('filter_key') .
          'filter_value' . request('filter_value') .
          'per_page' . request('per_page', 10);

        if (!Cache::has($cacheKey)) {
          break;
        }

        Cache::forget($cacheKey); // Clear old cache
        $page++;
      }

      return redirect()->route('users.index', ['page' => 1])->with('notification', [
        'status' => 'success',
        'title' => 'User Restored',
        'message' => 'User restored successfully.',
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
