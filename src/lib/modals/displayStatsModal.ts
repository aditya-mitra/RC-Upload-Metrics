import { BlockBuilder } from "@rocket.chat/apps-engine/definition/uikit";
import { IUIKitModalViewParam } from "@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder";

import generateRandomUUID from "../../utils/generateUUID";

export default function displayStatsModal(
  block: BlockBuilder
): IUIKitModalViewParam {
  const viewID = generateRandomUUID();

  block.addDividerBlock();

  block.addInputBlock({
    blockId: "heading_block",
    element: block.newPlainTextInputElement({
      placeholder: block.newPlainTextObject("Write a note to yourself!"),
      multiline: true,
      actionId: "text_input", // add this otherwise will be getting a random uuid
    }),
    label: block.newPlainTextObject("Note"),
  });

  block.addDividerBlock();

  return {
    id: viewID,
    title: block.newPlainTextObject("Create a new Memo for this room"),
    blocks: block.getBlocks(),
  };
}
