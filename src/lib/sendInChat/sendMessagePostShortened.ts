import { IModifyCreator } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IShortenResult } from '../../definitions/shorten';

interface ISendMessage {
  creator: IModifyCreator;
  shortenedResult: IShortenResult;
  room: IRoom;
}

export default async function sendMessageAfterShortenedUrl({
  creator,
  shortenedResult,
  room,
}: ISendMessage): Promise<void> {
  const text = shortenedResult.error
    ? `_Error_: **${shortenedResult.message}**`
    : `
Name: **${shortenedResult.name}**
URL: **${shortenedResult.shortenedUrl}**
Stats: \`/media-stat ${shortenedResult.name}\`
  `;

  const builder = creator.startMessage().setText(text).setRoom(room);
  await creator.finish(builder);
}
