import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {
  IUIKitResponse,
  UIKitBlockInteractionContext,
} from '@rocket.chat/apps-engine/definition/uikit';

import { shortenBlockMessage } from './utils/enums';
import getYourlsSingleStat from './lib/yourls/stat';
import createSingleStatModal from './lib/modals/createStatModal';
import sendNotifyMessage from './lib/sendInChat/sendNotifyMessage';

export default async function handleBlockAction(
  ctx: UIKitBlockInteractionContext,
  read: IRead,
  http: IHttp,
  _persist: IPersistence,
  modify: IModify,
): Promise<IUIKitResponse> {
  const {
    actionId, value, triggerId, user, room,
  } = ctx.getInteractionData();

  if (actionId === shortenBlockMessage.single_stat && value && room) {
    const result = await getYourlsSingleStat(http, value);

    if ('name' in result) {
      const modal = createSingleStatModal(
        modify.getCreator().getBlockBuilder(),
        result,
      );
      await modify.getUiController().openModalView(modal, { triggerId }, user);
    } else {
      sendNotifyMessage({
        notify: modify.getNotifier(),
        sender: user,
        msg: result.message,
        room,
      });
    }
  }

  return { success: true };
}
