import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import {
  IMessage,
  IPostMessageSent,
} from '@rocket.chat/apps-engine/definition/messages';
import {
  IUIKitInteractionHandler,
  IUIKitResponse,
  UIKitBlockInteractionContext,
} from '@rocket.chat/apps-engine/definition/uikit';

import postMessageSent from './src/postMessageSent';
import handleBlockAction from './src/blockAction';

export default class UploadMetricsApp
  extends App
  implements IPostMessageSent, IUIKitInteractionHandler {
  async executePostMessageSent(
    message: IMessage,
    read: IRead,
    http: IHttp,
    persist: IPersistence,
    modify: IModify,
  ): Promise<void> {
    postMessageSent(message, read, http, persist, modify);
  }

  async executeBlockActionHandler(
    ctx: UIKitBlockInteractionContext,
    read: IRead,
    http: IHttp,
    persist: IPersistence,
    modify: IModify,
  ): Promise<IUIKitResponse> {
    return handleBlockAction(ctx, read, http, persist, modify);
  }
}
