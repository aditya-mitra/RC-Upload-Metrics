import { BlockBuilder } from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";

import { IStatResultSuccess } from "../../definitions/stats";
import generateRandomUUID from "../../utils/generateUUID";

function generateCodeBlock(text: string | Record<string, unknown>): string {
  if (typeof text === "string") {
    return `\`\`\`
${text}
\`\`\``;
  }
  return `\`\`\`
${JSON.stringify(text, null, 2)}
\`\`\``;
}

function showData(key: string, value: string): string {
  if (value === "") {
    return `${key} : __unknown__`;
  }
  return `${key} : **${value}**`;
}

export default function createStatsModal(
  block: BlockBuilder,
  stat: IStatResultSuccess
): IUIKitModalViewParam {
  const viewID = generateRandomUUID();

  console.log

  block.addSectionBlock({
    text: block.newMarkdownTextObject(
      showData("Original URL", stat.originalUrl)
    ),
  });

  block.addSectionBlock({
    text: block.newMarkdownTextObject(showData("Title", stat.name)),
  });

  block.addSectionBlock({
    text: block.newMarkdownTextObject(showData("Short URL", stat.shortUrl)),
  });

  block.addDividerBlock();

  block.addSectionBlock({
    text: block.newMarkdownTextObject(showData("Clicks", stat.clicks + "")),
  });

  block.addSectionBlock({
    text: block.newMarkdownTextObject(
      showData("Additional Info", generateCodeBlock(stat.additionalInfo))
    ),
  });

  return {
    id: viewID,
    title: block.newPlainTextObject("Statistics"),
    blocks: block.getBlocks(),
  };
}
