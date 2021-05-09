import { IModifyCreator } from '@rocket.chat/apps-engine/definition/accessors';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { BlockBuilder } from '@rocket.chat/apps-engine/definition/uikit';
import { IShortenResult } from '../../definitions/shorten';
import { shortenBlockMessage } from '../../enums';

interface ISendMessage {
  creator: IModifyCreator;
  shortenedResult: IShortenResult;
  room: IRoom;
}

function addText(block: BlockBuilder, shortenedResult: IShortenResult) {
  const text = shortenedResult.error
    ? `_Error_: **${shortenedResult.message}**`
    : `
Name: **${shortenedResult.name}**
URL: **${shortenedResult.shortenedUrl}**
Stats: \`/media-stat ${shortenedResult.name}\`
  `;

  block.addContextBlock({
    elements: [block.newMarkdownTextObject(text)],
  });
}

function addButtons(block: BlockBuilder, shortenedResult: IShortenResult) {
  block.addActionsBlock({
    elements: [
      block.newButtonElement({
        text: block.newPlainTextObject('Get Stats'),
        actionId: shortenBlockMessage.stats,
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
  addButtons(block, shortenedResult);

  builder.setBlocks(block);

  await creator.finish(builder);
}
