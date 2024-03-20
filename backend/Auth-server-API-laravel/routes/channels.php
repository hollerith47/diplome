<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('testChannel', function () {
    return true;
});

Broadcast::channel('server.created', function () {
    return true;
});

Broadcast::channel('message.created', function () {
    return true;
});

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
