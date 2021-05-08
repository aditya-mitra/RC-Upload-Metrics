import { IHttp } from "@rocket.chat/apps-engine/definition/accessors";
import { IYourlsShortenRequest } from "../../definitions/yourls";

import { IMediaUrl } from "../../definitions/attachment";

async function getSingleYourlsUrl(http: IHttp, attachment: IMediaUrl) {
  const args = attachment.command.split(/\s+/g);
  const keyword = args[1] ?? "";
  const title = args[2] ?? `<${attachment.type}>`;

  // TODO: try again for `http.post`
  //  `http.post` is giving 403 error in **xml format**
  //  although provided is json format and the credentials too
  const params: IYourlsShortenRequest = {
    format: "json",
    action: "shorturl",
    url: attachment.url,
    username: "admin",
    password: "yourlspass",
    keyword,
    title,
  };

  const resp = await http.get("http://localhost:7777/yourls-api.php", {
    params,
  } as Record<string, unknown>);

  console.log(resp, "--- is the data");
}

export default async function getYourlsUrls(
  http: IHttp,
  attachments: IMediaUrl[]
) {
  const fns = attachments.map((attachment) =>
    getSingleYourlsUrl(http, attachment)
  );
  await Promise.all(fns);
}
