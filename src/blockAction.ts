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

export default async function handleBlockAction(
  ctx: UIKitBlockInteractionContext,
  read: IRead,
  http: IHttp,
  persist: IPersistence,
  modify: IModify,
): Promise<IUIKitResponse> {
  const { actionId } = ctx.getInteractionData();

  console.log(actionId, 'action id');

  return { success: true };
}
