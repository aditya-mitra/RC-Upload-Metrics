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

export default async function handleBlockAction(
  ctx: UIKitBlockInteractionContext,
  read: IRead,
  http: IHttp,
  persist: IPersistence,
  modify: IModify
): Promise<IUIKitResponse> {
  const { actionId, value } = ctx.getInteractionData();

  if (actionId === shortenBlockMessage.stats && value) {
    const res = await getYourlsStats(http, value);
    console.log(res);
  }

  return { success: true };
}
