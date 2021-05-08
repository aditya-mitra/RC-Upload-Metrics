import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import getMediaUrls from "./lib/getMedia";
import getYourlsUrls from "./lib/yourls/shorten";

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
  await getYourlsUrls(http, mediaUrls);
}
