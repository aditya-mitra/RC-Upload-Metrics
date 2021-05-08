import { IEnvironmentalVariableRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import { IMediaUrl } from '../definitions/attachment';

const regex = /!\s?(?:mv|make-?visible)/i;

/** get the multimedia urls from a message
 * can be _image_, _video_ or _audio_
 */
export default async function getAttachmentUrls(
  message: IMessage,
  envVars: IEnvironmentalVariableRead,
): Promise<IMediaUrl[]> {
  if (!message.attachments?.length) {
    return [];
  }

  const envRootUrl = await envVars.getValueByName('ROOT_URL');
  const rootUrl = envRootUrl.slice(0, envRootUrl.length - 1); // remove the ending slash

  const mediaUrls: IMediaUrl[] = [];
  const mainTextVisible = !!message.text?.match(regex)?.length;

  message.attachments.forEach((attachment) => {
    if (!!attachment.description?.match(regex)?.length || mainTextVisible) {
      const command = attachment.description || message.text || '';
      if (attachment.imageUrl) {
        mediaUrls.push({
          type: 'image',
          url: rootUrl + attachment.imageUrl,
          command,
        });
      } else if (attachment.audioUrl) {
        mediaUrls.push({
          type: 'audio',
          url: rootUrl + attachment.audioUrl,
          command,
        });
      } else if (attachment.videoUrl) {
        mediaUrls.push({
          type: 'video',
          url: rootUrl + attachment.videoUrl,
          command,
        });
      }
    }
  });

  return mediaUrls;
}
