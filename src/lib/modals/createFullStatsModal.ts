import { BlockBuilder } from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";

import { IFullStatsResultSuccess } from "../../definitions/stats";
import generateRandomUUID from "../../utils/generateUUID";
import generateCodeBlock from "../../utils/generateCodeBlock";

function showData(key: string, value: string): string {
  if (value === "") {
    return `${key} : __unknown__`;
  }
  return `${key} : **${value}**`;
}

export default function createFullStatsModal(
  block: BlockBuilder,
  result: IFullStatsResultSuccess
): IUIKitModalViewParam {
  const viewID = generateRandomUUID();

  block.addSectionBlock({
    text: block.newMarkdownTextObject(
      showData("Links Created", result.totalLinks + "")
    ),
  });

  block.addSectionBlock({
    text: block.newMarkdownTextObject(
      showData("Total Clicks", result.totalClicks + "")
    ),
  });

  block.addDividerBlock();

  result.links.forEach((link) => {
    block.addContextBlock({
      elements: [block.newMarkdownTextObject(generateCodeBlock(link, true))],
    });
  });

  return {
    id: viewID,
    title: block.newPlainTextObject("Full Statistics"),
    blocks: block.getBlocks(),
  };
}
