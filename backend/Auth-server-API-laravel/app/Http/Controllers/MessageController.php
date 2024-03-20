<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    use HttpResponses;
    public function sendMessage(Request $request): \Illuminate\Http\JsonResponse
    {
        $message = Message::create([
            'sender_id' => Auth::id(),
            "receiver_id" => $request->receiver_id,
            'content' => $request->contenu,
            'message_type' => $request->message_type,
            'is_read' => false,
            'parent_id' => $request->parent_id
        ]);

        return $this->success($message);
    }

    public function getMessagesForUser(User $user)
    {
        $messages = Message::where('receiver_id', $user->id)
            ->orWhere('sender_id', $user->id)
            ->get();

        return $this->success($messages);
    }

    public function getRepliesMessage(Message $message)
    {
        $replies = Message::where('parent_id', $message->parent_id)->get();

        return $this->success($replies);
    }
}
