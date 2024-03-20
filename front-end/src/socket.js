import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Configuration de Pusher
Pusher.logToConsole = true;


const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    encrypted: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    wssPort: 6001, // Port pour WSS
    disableStats: true,
    enabledTransports: ['ws']
});

// S'abonner à un canal et écouter les événements
echo.channel('testChanel')
    .listen('server.created"', (e) => {
        console.log(e);
    });

export default echo;
