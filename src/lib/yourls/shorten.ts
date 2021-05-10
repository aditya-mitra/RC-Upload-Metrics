import {
  HttpStatusCode,
  IHttp,
  IHttpResponse,
} from '@rocket.chat/apps-engine/definition/accessors';

import {
  IYourlsShortenRequest,
  IYourlsShortenResponse,
} from '../../definitions/yourls';
import { IMediaUrl } from '../../definitions/attachment';
import { IShortenResultError, IShortenResult } from '../../definitions/shorten';

function handleError(
  err: IHttpResponse | IHttpResponse['data'],
): IShortenResultError {
  if (!err || !err.data) {
    return {
      message: 'Unknown Error!\nPlease check the logs.',
    };
  }

  if (!err.data.message && err.statusCode) {
    // eslint-disable-next-line
    console.log(err); // would be beneficial to log this error
    return {
      message: `
StatusCode: **${err.statusCode}**
Please check logs.`,
    };
  }

  return {
    message: err.data.message,
  };
}

async function getSingleYourlsUrl(
  http: IHttp,
  attachment: IMediaUrl,
): Promise<IShortenResult> {
  const args = attachment.command.split(/\s+/g);
  const keyword = args[1] ?? '';
  const title = args[2] ? args.slice(2).join(' ') : `<${attachment.type}>`;

  // TODO: try again for `http.post`
  //  `http.post` is giving 403 error in **xml format**
  //  although provided is json format and the credentials too
  const params: IYourlsShortenRequest = {
    format: 'json',
    action: 'shorturl',
    // TODO: convert url, username and password into settings
    url: attachment.url,
    username: 'admin',
    password: 'yourlspass',
    keyword,
    title,
  };

  try {
    const resp = await http.get('http://localhost:7777/yourls-api.php', {
      params,
    } as Record<string, unknown>);

    if (resp.statusCode === HttpStatusCode.OK) {
      const data = resp.data as IYourlsShortenResponse;
      if (data.status === 'success') {
        return {
          shortenedUrl: data.shorturl,
          name: data.url?.keyword || '',
          originalUrl: data.url?.url || '',
          message: data.message,
        };
      }
    }
    return handleError(resp);
  } catch (e) {
    return handleError(e);
  }
}

export default async function getYourlsUrls(
  http: IHttp,
  attachments: IMediaUrl[],
): Promise<IShortenResult[]> {
  return Promise.all(
    attachments.map((attachment) => getSingleYourlsUrl(http, attachment)),
  );
}
