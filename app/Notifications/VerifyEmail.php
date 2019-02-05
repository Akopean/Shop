<?php

namespace App\Notifications;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;

class VerifyEmail extends VerifyEmailBase
{
    /**
     * Get the verification URL for the given notifiable.
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function verificationUrl($notifiable)
    {
        $prefix = env('APP_URL') . '/verify-email?queryURL=';
        $temporarySignedURL = URL::temporarySignedRoute(
            'api.auth.verification.verify', Carbon::now()->addMinutes(60), ['id' => $notifiable->getKey()]
        );
        return $prefix . urlencode($temporarySignedURL);
    }
}
