import {
  IHttp,
  IModify,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {
  ISlashCommand,
  SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import createSingleStatModal from './lib/modals/createStatModal';
import sendNotifyMessage from './lib/sendInChat/sendNotifyMessage';
import getYourlsSingleStat from './lib/yourls/stat';

export default class StatCommand implements ISlashCommand {
  public command = 'media-stat';

  public i18nDescription = 'get stats of an uploaded media';

  // TODO: add more multiple slash commands
  // like new, configure, and metric
  // area: decide
  public i18nParamsExample = 'name-of-the-stat OR short-url';

  public providesPreview = false;

  public async executor(
    ctx: SlashCommandContext,
    _read: IRead,
    modify: IModify,
    http: IHttp,
  ): Promise<void> {
    const url = ctx.getArguments()[0];

    const result = await getYourlsSingleStat(http, url);

    if ('name' in result) {
      const modal = createSingleStatModal(
        modify.getCreator().getBlockBuilder(),
        result,
      );
      await modify
        .getUiController()
        .openModalView(
          modal,
          { triggerId: `${ctx.getTriggerId()}` },
          ctx.getSender(),
        );
    } else {
      await sendNotifyMessage({
        notify: modify.getNotifier(),
        sender: ctx.getSender(),
        room: ctx.getRoom(),
        msg: result.message,
      });
    }
  }
}
