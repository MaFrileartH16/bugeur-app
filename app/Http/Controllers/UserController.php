<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
  /**
   * Display a listing of the users.
   */
  public function index()
  {
    $users = User::all();

    return Inertia::render('Users/Index', [
      'title' => 'Users',
      'users' => $users,
    ]);
  }

  /**
   * Store a newly created user in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'username' => 'required|string|max:255',
      'email' => 'required|email|unique:users,email',
      'user_type' => 'required|in:admin,project_manager,developer,tester',
      'password' => 'required|string|min:8',
    ]);

    User::create([
      'username' => $request->username,
      'email' => $request->email,
      'user_type' => $request->user_type,
      'password' => Hash::make($request->password),
    ]);

    return redirect()->route('users.index')->with('success', 'User created successfully.');
  }

  /**
   * Show the form for creating a new user.
   */
  public function create()
  {
    return Inertia::render('Users/Create', [
      'title' => 'Add User',
    ]);
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
    $request->validate([
      'username' => 'required|string|max:255',
      'email' => 'required|email|unique:users,email,' . $user->id,
      'user_type' => 'required|in:admin,project_manager,developer,tester',
    ]);

    $user->update($request->only(['username', 'email', 'user_type']));

    return redirect()->route('users.index')->with('success', 'User updated successfully.');
  }

  /**
   * Remove the specified user from storage.
   */
  public function destroy(User $user)
  {
    $user->delete();

    return redirect()->route('users.index')->with('success', 'User deleted successfully.');
  }
}
