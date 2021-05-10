import { IHttp } from "@rocket.chat/apps-engine/definition/accessors";
import { IYourlsFullStatsRequest } from "../../definitions/yourls";

interface IGetYourlsFullStats {
  http: IHttp;
  limit: number;
}

/**get a list of stats of the urls */
export default async function getYourlsFullStats({
  http,
  limit = 10,
}: IGetYourlsFullStats) {
  const params: IYourlsFullStatsRequest = {
    action: "stats",
    format: "json",
    username: "admin",
    password: "yourlspass",
    filter: "top",
    limit,
  };

  const resp = await http.get("http://localhost:7777/yourls-api.php", {
    params,
  } as Record<string, unknown>);

  console.log(resp);
}
