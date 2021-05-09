import {
  HttpStatusCode,
  IHttp,
  IHttpResponse,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IStatResult, IStatResultError } from "../../definitions/stats";

import {
  IYourlsStatRequest,
  IYourlsStatResponse,
} from "../../definitions/yourls";

function handleError(
  err: IHttpResponse | IHttpResponse["data"]
): IStatResultError {
  if (!err || !err.data) {
    return {
      message: "Unknown Error!\nPlease check the logs.",
    };
  }

  if (!err.data.message && err.statusCode) {
    // TODO: refactor to app log
    // eslint-disable-next-line no-console
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

export default async function getYourlsStats(
  http: IHttp,
  name: string
): Promise<IStatResult> {
  const params: IYourlsStatRequest = {
    format: "json",
    action: "url-stats",
    username: "admin",
    password: "yourlspass",
    shorturl: name,
  };

  const resp = await http.get("http://localhost:7777/yourls-api.php", {
    params,
  } as Record<string, unknown>);

  try {
    if (resp.statusCode === HttpStatusCode.OK) {
      const data = resp.data as IYourlsStatResponse;

      if (!data.link) {
        return handleError(resp);
      }

      return {
        message: data.message,
        originalUrl: data.link.url,
        additionalInfo: { timestamp: data.link.timestamp },
        clicks: data.link.clicks,
        name: data.link.title,
        shortUrl: data.link.shorturl,
      };
    }
    return handleError(resp);
  } catch (e) {
    return handleError(e);
  }
}
