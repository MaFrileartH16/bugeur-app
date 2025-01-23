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
      'title' => 'Edit Profile',
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
      'profile_photo_path' => ['nullable', 'image', 'max:1024'], // Maksimal 1MB
      'full_name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $request->user()->id],
      'password' => ['nullable', 'string', 'min:8'],
    ]);

    $user = $request->user();

    // Tangani avatar (unggah file)
    if ($request->hasFile('profile_photo_path')) {
      // Hapus avatar lama jika ada
      if ($user->profile_photo_path) {
        Storage::disk('public')->delete($user->profile_photo_path);
      }

      // Simpan avatar baru
      $path = $request->file('profile_photo_path')->store('avatars', 'public');
      $validated['profile_photo_path'] = $path;
    } else {
      unset($validated['profile_photo_path']);
    }

    // Perbarui data pengguna
    $user->fill([
      'profile_photo_path' => $validated['profile_photo_path'] ?? $user->profile_photo_path, // Tetap gunakan avatar lama jika tidak ada unggahan baru
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
