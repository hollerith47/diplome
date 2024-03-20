<?php

namespace App\Notifications;

use Ichtrojan\Otp\Otp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordVerificationNotification extends Notification
{
    use Queueable;

    public string $message;
    public string $subject;
    public string $fromEmail;
    public string $mailer;
    public Otp $otp;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message = "Use the below code for resetting password";
        $this->subject = "Reset Password request";
        $this->fromEmail = config("MAIL_FROM_ADDRESS", 'info@cecfrance.com');
        $this->mailer = config("MAIL_MAILER", "smtp");
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
        $otp = $this->otp->generate($notifiable->email, "numeric", 6, 10);
        $resetUrl = env('FRONTEND_URL') . '/reset-password';
        return (new MailMessage)
            ->mailer($this->mailer)
            ->subject($this->subject)
            ->greeting("Hello " . $notifiable->first_name . ",")
            ->line($this->message)
            ->line("Your Reset Code: " . $otp->token)
            ->line("This code will expire in 10 minutes. Please use it promptly to reset your password.")
            ->action('Reset Password', $resetUrl)
            ->line("If you did not request a password reset, no further action is required. However, you may want to secure your account if this was unexpected.")
            ->line("Thank you for using our platform. We're committed to ensuring the security of your account.");
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
