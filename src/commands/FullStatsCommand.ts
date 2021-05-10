import {
  IHttp,
  IModify,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
  ISlashCommand,
  SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";

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
    await getYourlsFullStats({ http, limit: 10 });
  }
}
