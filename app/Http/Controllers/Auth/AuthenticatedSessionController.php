<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Log;

class AuthenticatedSessionController extends Controller
{
  /**
   * Display the login view.
   */
  public function create(): Response
  {
    return Inertia::render('Auth/Login', [
      "title" => "Login",
      'notification' => session()->pull('notification'),
    ]);
  }

  /**
   * Handle an incoming authentication request.
   */
  /**
   * Handle an incoming authentication request.
   */
  public function store(LoginRequest $request): RedirectResponse
  {
    try {
      $request->authenticate();

      $request->session()->regenerate();

      return redirect()->route('dashboard')->with('notification', [
        'status' => 'success',
        'title' => 'Login Successful',
        'message' => 'Welcome back! You have successfully logged in.',
      ]);
    } catch (Exception $e) {

      return redirect()->route('login')->with('notification', [
        'status' => 'error',
        'title' => 'Login Failed',
        'message' => 'Unable to log in. Please check your email and password.',
      ]);
    }
  }


  /**
   * Destroy an authenticated session.
   */
  /**
   * Log out the authenticated user.
   */
  public function destroy(Request $request): RedirectResponse
  {
    try {
      Auth::guard('web')->logout();

      $request->session()->invalidate();

      $request->session()->regenerateToken();

      return redirect()->route('login')->with('notification', [
        'status' => 'success',
        'title' => 'Logout Successful',
        'message' => 'You have been logged out successfully.',
      ]);
    } catch (Exception $e) {
      return redirect()->route('dashboard')->with('notification', [
        'status' => 'error',
        'title' => 'Logout Failed',
        'message' => 'An error occurred while trying to log out. Please try again.',
      ]);
    }
  }

}
