import {
  HttpStatusCode,
  IHttp,
  IHttpResponse,
} from '@rocket.chat/apps-engine/definition/accessors';

import {
  IFullStatsResult,
  IFullStatsResultError,
} from '../../definitions/stats';
import {
  IYourlsFullStatsRequest,
  IYourlsFullStatsResponse,
} from '../../definitions/yourls';

interface IGetYourlsFullStats {
  http: IHttp;
  limit: number;
}

function getLinkDetails(
  links: IYourlsFullStatsResponse['links'],
): Record<string, unknown>[] {
  if (links) {
    return Object.values(links);
  }
  return [];
}

function handleError(
  err: IHttpResponse | IHttpResponse['data'],
): IFullStatsResultError {
  if (!err || !err.data) {
    return {
      message: 'Unknown Error!\nPlease check the logs.',
    };
  }

  if (!err.data.message && err.statusCode) {
    console.log(err); // eslint-disable-line
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

/** get a list of stats of the urls */
export default async function getYourlsFullStats({
  http,
  limit = 10,
}: IGetYourlsFullStats): Promise<IFullStatsResult> {
  const params: IYourlsFullStatsRequest = {
    action: 'stats',
    format: 'json',
    username: 'admin',
    password: 'yourlspass',
    filter: 'top',
    limit,
  };
  try {
    const resp = await http.get('http://localhost:7777/yourls-api.php', {
      params,
    } as Record<string, unknown>);

    if (resp.statusCode === HttpStatusCode.OK) {
      const data = resp.data as IYourlsFullStatsResponse;
      const links = getLinkDetails(data.links);
      return {
        message: data.message,
        links,
        totalClicks: data.stats.total_clicks,
        totalLinks: data.stats.total_links,
      };
    }
    return handleError(resp);
  } catch (e) {
    return handleError(e);
  }
}
