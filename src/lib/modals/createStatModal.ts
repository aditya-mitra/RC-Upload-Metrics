import { BlockBuilder } from '@rocket.chat/apps-engine/definition/uikit';
import { IUIKitModalViewParam } from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';

import { IStatResultSuccess } from '../../definitions/stats';
import generateRandomUUID from '../../utils/generateUUID';
import generateCodeBlock from '../../utils/generateCodeBlock'

function showData(key: string, value: string): string {
  if (value === '') {
    return `${key} : __unknown__`;
  }
  return `${key} : **${value}**`;
}

export default function createSingleStatModal(
  block: BlockBuilder,
  stat: IStatResultSuccess,
): IUIKitModalViewParam {
  const viewID = generateRandomUUID();

  block.addSectionBlock({
    text: block.newMarkdownTextObject(
      showData('Original URL', stat.originalUrl),
    ),
  });

  block.addSectionBlock({
    text: block.newMarkdownTextObject(showData('Title', stat.name)),
  });

  block.addSectionBlock({
    text: block.newMarkdownTextObject(showData('Short URL', stat.shortUrl)),
  });

  block.addDividerBlock();

  block.addSectionBlock({
    text: block.newMarkdownTextObject(showData('Clicks', `${stat.clicks}`)),
  });

  block.addSectionBlock({
    text: block.newMarkdownTextObject(
      showData('Additional Info', generateCodeBlock(stat.additionalInfo)),
    ),
  });

  return {
    id: viewID,
    title: block.newPlainTextObject('Statistics'),
    blocks: block.getBlocks(),
  };
}
