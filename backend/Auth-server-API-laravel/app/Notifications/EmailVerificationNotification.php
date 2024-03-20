<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Ichtrojan\Otp\Otp;

class EmailVerificationNotification extends Notification
{
    use Queueable;
    public Otp $otp;
    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->otp = new Otp;
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
        $otp = $this->otp->generate($notifiable->email,"numeric",6,10);
        return (new MailMessage)
            ->from(config("MAIL_FROM_ADDRESS", 'info@cecfrance.com'), config("MAIL_FROM_NAME", "Your Application Name"))
            ->subject("Complete Your Email Verification")
            ->greeting("Hello " . $notifiable->first_name . ",")
            ->line("Thank you for signing up. To complete your registration, please verify your email address by entering the following verification code on the verification page.")
            ->line("Your Verification Code: " . $otp->token)
            ->line("This code is valid for 10 minutes and can be used only once.")
            ->line("If you did not create an account, no further action is required.")
            ->line("Thank you for using our application!");
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
