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

  public function update(Request $request): RedirectResponse
  {
    $user = $request->user();

    // Tangani avatar (unggah file)
    if ($request->hasFile('profile_photo')) {
      // Hapus avatar lama jika ada
      if ($user->profile_photo_path) {
        Storage::disk('public')->delete($user->profile_photo_path);
      }

      // Simpan avatar baru
      $path = $request->file('profile_photo')->store('profile-photos', 'public');
      $user->profile_photo_path = $path;
    }

    // Perbarui data pengguna
    $user->fill([
      'full_name' => $request->full_name,
      'email' => $request->email,
    ]);

    // Update password jika diisi
    if (!empty($request->password)) {
      $user->password = bcrypt($request->password);
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
