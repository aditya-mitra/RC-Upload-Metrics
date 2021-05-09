import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
  IUIKitResponse,
  UIKitBlockInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";

import { shortenBlockMessage } from "./utils/enums";
import getYourlsStats from "./lib/yourls/stats";
import createStatsModal from "./lib/modals/createStatsModal";

export default async function handleBlockAction(
  ctx: UIKitBlockInteractionContext,
  read: IRead,
  http: IHttp,
  _persist: IPersistence,
  modify: IModify
): Promise<IUIKitResponse> {
  const { actionId, value, triggerId, user } = ctx.getInteractionData();

  // TODO: remove the `eslint-disable` lines

  if (actionId === shortenBlockMessage.stats && value) {
    const res = await getYourlsStats(http, value);
    console.log(res); // eslint-disable-line
  }

  const modal = createStatsModal(modify.getCreator().getBlockBuilder());

  await modify.getUiController().openModalView(modal, { triggerId }, user);

  return { success: true };
}
