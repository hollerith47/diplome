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
    public String $message;
    public String $subject;
    public String $fromEmail;
    public String $mailer;
    public Otp $otp;
    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message = "Use the below code for verification processing";
        $this->subject = "Verification needed";
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
        $otp = $this->otp->generate($notifiable->email,"numeric",6,10);
        return (new MailMessage)
            ->mailer($this->mailer)
            ->subject($this->subject)
            ->greeting("Hello ".$notifiable->first_name)
            ->line($this->message)
            ->line("code: ". $otp->token);
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
