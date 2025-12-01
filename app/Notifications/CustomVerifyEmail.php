<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class CustomVerifyEmail extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        // Generate signed verification URL
        $verificationUrl = URL::temporarySignedRoute(
            'api.v1.customers.verify',  // Laravel API verification route name
            Carbon::now()->addMinutes(5),
            ['id' => $notifiable->id]
        );
         $frontendUrl = url("/verify-email-f?url=" . urlencode($verificationUrl));

        return (new MailMessage)
            ->subject('Verify Your Email')
            ->view('mail.custom_verify', ['url' => $frontendUrl]);
            // ->line('Thank you for registering. Please verify your email by clicking the button below.')
            // ->action('Verify Email', '/signin?verifyUrl=' . urlencode($verificationUrl))
            // ->action('Verify Email',  $frontendUrl)
            // ->line('If you did not create an account, no further action is required.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}