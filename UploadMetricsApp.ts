import { IConfigurationExtend } from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";

import StatCommand from "./src/Command";
export default class UploadMetricsApp extends App {
  protected async extendConfiguration(
    config: IConfigurationExtend
  ): Promise<void> {
    await config.slashCommands.provideSlashCommand(new StatCommand());
  }
}
