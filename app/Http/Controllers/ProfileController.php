<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
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
      'title' => 'Profile',
      'notification' => session()->pull('notification'),
    ]);
  }

  /**
   * Update the user's profile information.
   */
  public function update(Request $request): RedirectResponse
  {
    // Validasi input
    $validated = $request->validate([
      'avatar' => ['nullable', 'image', 'max:1024'], // Maksimal 1MB
      'full_name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $request->user()->id],
      'password' => ['nullable', 'string', 'min:8'],
    ]);

    $user = $request->user();

    // Tangani avatar (unggah file)
    if ($request->hasFile('avatar')) {
      // Hapus avatar lama jika ada
      if ($user->avatar) {
        Storage::disk('public')->delete($user->avatar);
      }

      // Simpan avatar baru
      $path = $request->file('avatar')->store('avatars', 'public');
      $validated['avatar'] = $path;
    } else {
      unset($validated['avatar']);
    }

    // Perbarui data pengguna
    $user->fill([
      'avatar' => $validated['avatar'] ?? $user->avatar, // Tetap gunakan avatar lama jika tidak ada unggahan baru
      'full_name' => $validated['full_name'],
      'email' => $validated['email'],
    ]);

    if (!empty($validated['password'])) {
      $user->password = bcrypt($validated['password']);
    }

    // Reset email verifikasi jika email diubah
    if ($user->isDirty('email')) {
      $user->email_verified_at = null;
    }

    // Simpan perubahan
    $user->save();

    return Redirect::route('profile.edit', $user)->with('notification', [
      'status' => 'success',
      'title' => 'Profile Updated',
      'message' => 'Your profile information has been updated successfully.',
    ]);
  }
}
