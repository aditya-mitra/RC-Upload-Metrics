import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import {
  ISlashCommand,
  SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';

export default class StatCommand implements ISlashCommand {
  public command = 'mediastat';

  public i18nDescription = 'get stats of an uploaded media';

  public i18nParamsExample = '<url>';

  public providesPreview = false;

  public async executor(
    ctx: SlashCommandContext,
    read: IRead,
    modify: IModify,
    http: IHttp,
    persist: IPersistence,
  ): Promise<void> {
    console.log('hit');
    const rec = await read.getPersistenceReader().read('anything');
    console.log(rec, 'was rec');

    const nofify = modify.getNotifier();
    const message: IMessage = {
      text: 'done',
      room: ctx.getRoom(),
      sender: ctx.getSender(),
    };
    nofify.notifyUser(ctx.getSender(), message);
  }
}
