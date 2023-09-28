import { LogLevel, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { emitter, eventTypes } from './event-hub';
import { useUserInfoStore } from '../store/user-info';
import { promiseTimeout } from '@vueuse/core';

const createConnection = (accessToken) => {
    const url = import.meta.env.VITE_APP_SIGNALR_URL + '?access-token=' + accessToken;
    const connection = new HubConnectionBuilder()
        .withUrl(url, {
            headers: {
                'access-token': accessToken,
            },
            withCredentials: false,
        })
        .configureLogging(LogLevel.Information)
        .build();

    connection.onclose(async () => {
        await start();
    });

    connection.on(eventTypes.OnChatMessage, (chatMessage) => {
        emitter.emit(eventTypes.OnChatMessage, chatMessage);
    });

    connection.on(eventTypes.OnConsoleLog, (consoleLog) => {
        emitter.emit(eventTypes.OnConsoleLog, consoleLog);
    });

    return connection;
};

let connection;
export async function start() {
    try {
        const userInfoStore = useUserInfoStore();

        if (userInfoStore.isLoggedIn) {
            if (!connection) {
                connection = createConnection(userInfoStore.accessToken);
            }

            await connection.start();
            console.log('SignalR Connected.');
        }
    } catch (err) {
        console.error(err);
        console.log('SignalR Reconnecting...');
        await promiseTimeout(5000);
        await start();
    }
}

export async function stop() {
    if (connection) {
        await connection.stop();
    }
}
