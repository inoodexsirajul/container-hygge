<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Contact extends Mailable
{
    use Queueable, SerializesModels;
    public array $data;

    /**
     * Create a new message instance.
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        // Example: dynamic subject and replyTo from incoming contact data
        $subject = $this->data['subject'] ?? 'New Contact Message';
        $replyToEmail = $this->data['email'] ?? null;
        $replyToName = trim(($this->data['first_name'] ?? '') . ' ' . ($this->data['last_name'] ?? ''));

        $replyTo = $replyToEmail
            ? [new Address($replyToEmail, $replyToName ?: null)]
            : [];

        // Optionally set From if you want to override default MAIL_FROM
        // $from = new Address('no-reply@yourdomain.com', 'Your App');

        return new Envelope(
            subject: $subject,
            // from: $from, // uncomment if you want a custom From
            replyTo: $replyTo,
        );
        // return new Envelope(
        //     subject: 'Contact',
        // );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.contact',

            with: [
                'data' => $this->data,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
