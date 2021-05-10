import { IModifyCreator } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { BlockBuilder } from '@rocket.chat/apps-engine/definition/uikit';
import {
  IShortenResult,
  IShortenResultSuccess,
} from '../../definitions/shorten';
import { shortenBlockMessage } from '../../utils/enums';

interface ISendMessage {
  creator: IModifyCreator;
  shortenedResult: IShortenResult;
  room: IRoom;
}

function addText(block: BlockBuilder, shortenedResult: IShortenResult) {
  const text = 'name' in shortenedResult
    ? `
Id: **${shortenedResult.name}**
URL: **${shortenedResult.shortenedUrl}**
Original URL: **${shortenedResult.originalUrl}**
Stats: \`/media-stat ${shortenedResult.name}\`
  `
    : `_Error_ : **${shortenedResult.message}**`;

  block.addContextBlock({
    elements: [block.newMarkdownTextObject(text)],
  });
}

function addButtons(
  block: BlockBuilder,
  shortenedResult: IShortenResultSuccess,
) {
  block.addActionsBlock({
    elements: [
      block.newButtonElement({
        text: block.newPlainTextObject('Get Stats'),
        actionId: shortenBlockMessage.single_stat,
        value: shortenedResult.name,
      }),
    ],
  });
}

export default async function sendMessageAfterShortenedUrl({
  creator,
  shortenedResult,
  room,
}: ISendMessage): Promise<void> {
  const builder = creator.startMessage().setRoom(room);

  const block = creator.getBlockBuilder();
  addText(block, shortenedResult);

  if ('name' in shortenedResult) {
    addButtons(block, shortenedResult);
  }

  builder.setBlocks(block);

  await creator.finish(builder);
}
