import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import getMediaUrls from "./lib/getMedia";

export default async function postMessageSent(
  message: IMessage,
  read: IRead,
  http: IHttp,
  persist: IPersistence,
  modify: IModify
): Promise<void> {
  const mediaUrls = await getMediaUrls(
    message,
    read.getEnvironmentReader().getEnvironmentVariables()
  );
  console.log(mediaUrls);
}
