<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendSetAdminNotification extends Notification
{
    use Queueable;

    public string $message;
    public string $subject;
    public string $fromEmail;
    public string $mailer;
    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message = "Congratulations! You have been designated as an administrator for our platform. This role comes with new responsibilities and the ability to manage and oversee various aspects of our system. We are confident in your abilities and look forward to seeing the contributions you will make in this new capacity.";
        $this->subject = "Welcome to Your New Role as Administrator";
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
            ->greeting("Welcome Aboard, " . $notifiable->first_name . "!")
            ->line($this->message)
            ->line("As an administrator, you now have access to the admin panel where you can manage settings, users, content, and much more.")
            ->line("To get started, please visit the admin panel and log in with your credentials. Should you have any questions or require assistance, do not hesitate to reach out.")
            ->action('Access Admin Panel', config("APP_ADMIN_URL"))
            ->line("We are thrilled to have you on our team and look forward to your invaluable input and leadership. Welcome to the team!");
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
