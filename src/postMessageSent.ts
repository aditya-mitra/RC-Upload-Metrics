import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IShortenResult } from './definitions/shorten';
import getAttachmentUrls from './lib/getAttachment';
import sendMessage from './lib/sendMessage';
import getYourlsUrls from './lib/yourls/shorten';

function createMessage(shortenResult: IShortenResult): string {
  if (shortenResult.error) {
    return shortenResult.message;
  }
  const message = `
Name: **${shortenResult.name}**
URL: **${shortenResult.shortenedUrl}**
Stats: \`/media-stat ${shortenResult.name}\`
  `;

  return message;
}

export default async function postMessageSent(
  message: IMessage,
  read: IRead,
  http: IHttp,
  _persist: IPersistence,
  modify: IModify,
): Promise<void> {
  const mediaUrls = await getAttachmentUrls(
    message,
    read.getEnvironmentReader().getEnvironmentVariables(),
  );

  const shortenedResults = await getYourlsUrls(http, mediaUrls);

  await Promise.all(
    shortenedResults.map((result) => sendMessage({
      creator: modify.getCreator(),
      room: message.room,
      msg: createMessage(result),
    })),
  ).catch((e) => {
    // TODO: log this error using rocket.chat app
    console.log(e); // eslint-disable-line no-console
  });
}
