<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoginNotification extends Notification
{
    use Queueable;
    public String $message;
    public String $subject;
    public String $fromEmail;
    public String $mailer;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message = "You have been logged in";
        $this->subject = "New Logging in";
        $this->fromEmail = config("MAIL_FROM_ADDRESS", 'info@cecfrance.com');
        $this->mailer = config("MAIL_MAILER", "smtp");
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
        return (new MailMessage)
            ->mailer($this->mailer)
            ->subject($this->subject)
            ->greeting("Hello ".$notifiable->first_name)
            ->line($this->message);
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
