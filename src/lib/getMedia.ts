import {
  IEnvironmentalVariableRead,
  IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";

import { MediaUrlType } from "../enums";

interface IMediaUrl {
  type: MediaUrlType;
  url: string;
}

const regex = /!\s?(?:mv|make-visible)/i;

/** get the multimedia urls from a message
 * can be _image_, _video_ or _audio_
 */
export default async function getMediaUrls(
  message: IMessage,
  envVars: IEnvironmentalVariableRead
): Promise<IMediaUrl[]> {
  if (!message.attachments?.length) {
    return [];
  }

  const envRootUrl = await envVars.getValueByName("ROOT_URL");
  const rootUrl = envRootUrl.slice(0, envRootUrl.length - 1); // remove the ending slash
  console.log(rootUrl);

  const mediaUrls: IMediaUrl[] = [];
  const mainTextVisible = !!message.text?.match(regex)?.length;

  message.attachments.forEach((attachment) => {
    if (!!attachment.description?.match(regex)?.length || mainTextVisible) {
      if (attachment.imageUrl) {
        mediaUrls.push({
          type: MediaUrlType.image,
          url: rootUrl + attachment.imageUrl,
        });
      } else if (attachment.audioUrl) {
        mediaUrls.push({
          type: MediaUrlType.audio,
          url: rootUrl + attachment.audioUrl,
        });
      } else if (attachment.videoUrl) {
        mediaUrls.push({
          type: MediaUrlType.video,
          url: rootUrl + attachment.videoUrl,
        });
      }
    }
  });

  return mediaUrls;
}
