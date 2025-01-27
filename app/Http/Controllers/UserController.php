<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
      $query = User::withTrashed()->where('role', '!=', 'Admin');

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
          $query->where('role');
        } elseif ($filterKey === 'status') {
          if ($filterValue === 'active') {
            $query->whereNull('deleted_at');
          } elseif ($filterValue === 'inactive') {
            $query->whereNotNull('deleted_at');
          }
        }
      }

      // Filter by user (if user filter is provided)
      if (request('user')) {
        $query->where('id', request('user'));
      }

      // Sort
      if (request('sort_key') && request('sort_direction')) {
        $query->orderBy(request('sort_key'), request('sort_direction'));
      } else {
        $query->orderBy('full_name', 'asc');
      }

      // Pagination
      $users = $query->paginate(request('per_page', 10));

      return Inertia::render('Users/Index', [
        'title' => 'Users',
        'users' => $users,
        'search' => request('search'),
        'sort_key' => request('sort_key'),
        'sort_direction' => request('sort_direction'),
        'filter_key' => request('filter_key'),
        'filter_value' => request('filter_value'),
        'user' => request('user'),
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
        'user' => request('user'),
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
      // Handle profile photo upload
      $profilePhotoPath = null;
      if ($request->hasFile('profile_photo')) {
        $profilePhotoPath = $request->file('profile_photo')->store('profile-photos', 'public');
      }

      // Create user
      User::create([
        'full_name' => $request->full_name,
        'email' => $request->email,
        'role' => $request->role,
        'password' => bcrypt($request->password),
        'profile_photo_path' => $profilePhotoPath,
      ]);

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
  public function edit($userId): Response|RedirectResponse
  {
    try {
      // Custom route model binding langsung di method edit
      $user = User::withTrashed()->findOrFail($userId);

      return Inertia::render('Users/Edit', [
        'title' => 'Edit User',
        'user' => $user,
        'notification' => session()->pull('notification'),
      ]);
    } catch (ModelNotFoundException $e) {
      // Tangani error jika user tidak ditemukan
      return back()->with('notification', [
        'status' => 'error',
        'title' => 'Error',
        'message' => 'User not found.',
      ]);
    } catch (Throwable $e) {
      // Tangani error lainnya
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

      // Jika tidak ada password baru, hapus key 'password' dari $updateData
      if (empty($updateData['password'])) {
        unset($updateData['password']);
      }

      // Update data user (mutator di model akan menghash password jika ada)
      $user->update($updateData);

      return redirect()->route('users.index')->with('notification', [
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
