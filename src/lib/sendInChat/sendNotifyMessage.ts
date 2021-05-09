import { INotifier } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

interface IAlertMessage {
  notify: INotifier;
  sender: IUser;
  room: IRoom;
  msg: string;
}

export default async function sendNotifyMessage({
  notify,
  sender,
  msg,
  room,
}: IAlertMessage): Promise<void> {
  const message: IMessage = {
    text: msg,
    room,
    sender,
    alias: 'Media Metrics',
    avatarUrl:
      'https://res.cloudinary.com/gamersinstinct7/image/upload/v1620497248/rc/rc_metrics_icon.png.png',
  };
  await notify.notifyUser(sender, message);
}
