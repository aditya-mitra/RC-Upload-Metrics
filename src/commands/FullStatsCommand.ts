import {
  IHttp,
  IModify,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
  ISlashCommand,
  SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import sendNotifyMessage from "../lib/sendInChat/sendNotifyMessage";

import getYourlsFullStats from "../lib/yourls/fullStats";

export default class FullStatsCommand implements ISlashCommand {
  public command = "media-stat-full";

  public i18nDescription = "get full stats";

  public i18nParamsExample = "";

  public providesPreview = false;

  public async executor(
    ctx: SlashCommandContext,
    _read: IRead,
    modify: IModify,
    http: IHttp
  ): Promise<void> {
    const result = await getYourlsFullStats({ http, limit: 10 });
    if ("links" in result) {
      console.log(result.links);
    }

    sendNotifyMessage({
      notify: modify.getNotifier(),
      sender: ctx.getSender(),
      msg: result.message,
      room: ctx.getRoom(),
    });
  }
}
