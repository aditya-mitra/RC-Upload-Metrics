import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";

export default async function postMessageSent(
  message: IMessage,
  read: IRead,
  http: IHttp,
  persist: IPersistence,
  modify: IModify
): Promise<void> {
  if (!message.text?.match(/!\s?(?:mv|make-visible)/i)?.length) {
    return;
  }
}
