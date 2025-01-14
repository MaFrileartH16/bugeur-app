<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
  /**
   * Display the user's profile form.
   */
  public function edit(Request $request): Response
  {
    return Inertia::render('Profile/Edit', [
      'title' => 'Edit Profile',
    ]);
  }

  /**
   * Update the user's profile information.
   */
  public function update(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'full_name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $request->user()->id],
      'password' => ['nullable', 'string', 'min:8'],
    ]);

    $user = $request->user();
    $user->fill([
      'full_name' => $validated['full_name'],
      'email' => $validated['email'],
    ]);

    if (!empty($validated['password'])) {
      $user->password = $validated['password'];
    }

    if ($user->isDirty('email')) {
      $user->email_verified_at = null;
    }

    $user->save();

    return Redirect::route('profile.edit', Auth::user());
  }
}
