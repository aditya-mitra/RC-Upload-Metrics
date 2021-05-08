import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import {
  IMessage,
  IPostMessageSent,
} from "@rocket.chat/apps-engine/definition/messages";

import postMessageSent from './src/postMessageSent'
export default class UploadMetricsApp extends App implements IPostMessageSent {
  async executePostMessageSent(
    message: IMessage,
    read: IRead,
    http: IHttp,
    persist: IPersistence,
    modify: IModify
  ): Promise<void> {
    postMessageSent(message,read,http,persist,modify
      )
  }
}
