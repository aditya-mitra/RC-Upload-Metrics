import { IModifyCreator } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

interface ISendMessage {
  creator: IModifyCreator;
  msg: string;
  room: IRoom;
  sender: IUser;
}

export default async function sendMessage({
  creator,
  msg,
  room,
  sender,
}: ISendMessage): Promise<void> {
  const builder = creator
    .startMessage()
    .setText(msg)
    .setRoom(room)
  await creator.finish(builder);
}
