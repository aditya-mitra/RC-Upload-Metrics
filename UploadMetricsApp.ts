import { IConfigurationExtend } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';

export default class UploadMetricsApp extends App {
  protected async extendConfiguration(
    config: IConfigurationExtend,
  ): Promise<void> {
    console.log("app", config); // eslint-disable-line
  }
}
