<?php

namespace App\Notifications;

use Ichtrojan\Otp\Otp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminCodeRegistrationNotification extends Notification
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
        $this->message = "You've been invited to register as an administrator for our platform. Please use the code provided below to complete your registration. Note that the code is valid for only 1 hour from the time of this email. Ensure to use it promptly to gain access.";
        $this->subject = "Admin Registration Invitation";
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
        $otp = $this->otp->generate($notifiable->email, "numeric", 6, 60);
        return (new MailMessage)
            ->mailer($this->mailer)
            ->subject($this->subject)
            ->greeting("Hello " . $notifiable->first_name)
            ->line($this->message)
            ->line("Code: " . $otp->token)
            ->line("This code will expire in 1 hour. Please complete your registration before it expires.");
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
