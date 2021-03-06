<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\ApiController;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;

class VerificationController extends ApiController
{
    use VerifiesEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    /**
     * Show the email verification notice.
     *
     */
    public function show()
    {
        //
    }

    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function verify(Request $request)
    {
        $user = $request->user();
        if ($request->route('id') == $user->getKey() &&
            $user->markEmailAsVerified()) {
            event(new Verified($user));
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Email verified!',
            'user' => $user
        ]);
    }

    /**
     * Resend the email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json('User already have verified email!', 422);
        }
        $request->user()->sendEmailVerificationNotification();
        return response()->json('The notification has been resubmitted');
    }
}
