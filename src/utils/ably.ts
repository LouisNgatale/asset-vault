import { ABLY_KEY } from '../constants/routes';
import Ably from 'ably';

export const realtime = new Ably.Realtime({ key: ABLY_KEY });

export const startSocketConnection = () => {
  try {
    realtime.connect();

    realtime.connection.on('connected', () => {
      console.info(
        '---------------- ABLY Socket connected -----------------------',
      );

      // Update status
      // store.dispatch(setSocketConnectionStatus(true));
    });

    realtime.connection.on('failed', () => {
      // Update status
      // store.dispatch(setSocketConnectionStatus(false));

      console.info(
        '---------------- ABLY Socket failed, retrying manually ----------',
      );

      realtime.connect();
    });

    realtime.connection.on('disconnected', () => {
      // Update status
      // store.dispatch(setSocketConnectionStatus(false));

      console.info('---------------- ABLY Socket connection lost ----------');
      realtime.connect();
    });

    return realtime;
  } catch (error) {
    console.error({ error });
    // Update status
    // store.dispatch(setSocketConnectionStatus(false));
    return null;
  }
};
