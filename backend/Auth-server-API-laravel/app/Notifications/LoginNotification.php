<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;

class LoginNotification extends Notification
{
    use Queueable;
    public string $loginTime;
    public mixed $ipAddress;

    public String $message;
    public String $subject;
    public String $fromEmail;
    public String $mailer;

    /**
     * Create a new notification instance.
     */
    public function __construct($ipAddress = null)
    {
        $this->loginTime = Carbon::now()->toDateTimeString();
        $this->ipAddress = $ipAddress;
        $this->subject = "Successful Login Notification";
        $this->fromEmail = config("MAIL_FROM_ADDRESS", 'dev@htech-cloud.com');
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
        $message = (new MailMessage)
            ->mailer($this->mailer)
            ->subject($this->subject)
            ->greeting("Hello " . $notifiable->first_name . ",")
            ->line("This is a notification to inform you that your account was successfully logged into.")
            ->line("Login time: " . $this->loginTime);

        // Optionally add the IP address if available
        if ($this->ipAddress) {
            $message->line("IP Address: " . $this->ipAddress);
        }

        $message->line("If this was you, you can safely ignore this email. If you suspect an unauthorized login, please change your password immediately and contact support.");

        return $message;
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
