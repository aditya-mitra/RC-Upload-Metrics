import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import getAttachmentUrls from './lib/getAttachment';
import sendMessagePostShortened from './lib/sendInChat/sendMessagePostShortened';
import getYourlsUrls from './lib/yourls/shorten';

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
    shortenedResults.map((result) => sendMessagePostShortened({
      creator: modify.getCreator(),
      room: message.room,
      shortenedResult: result,
    })),
  ).catch((e) => {
    // TODO: log this error using rocket.chat app
    console.log(e); // eslint-disable-line no-console
  });
}
