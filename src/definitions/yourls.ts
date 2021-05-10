export interface IYourlsShortenRequest {
  format: "json";
  action: "shorturl";
  url: string;
  username: string;
  password: string;
  keyword?: string;
  title?: string;
}

export interface IYourlsShortenResponse {
  statusCode?: number;
  errorCode?: number;
  message: string;
  shorturl: string;
  status: "success" | "fail";
  url?: {
    keyword: string;
    url: string;
    data: string;
  };
}

export interface IYourlsStatRequest {
  format: "json";
  action: "url-stats";
  shorturl: string;
  username: string;
  password: string;
}

interface IYourlLinkDetail {
  shorturl: string;
  title: string;
  timestamp: string;
  clicks: string;
  url: string;
}

export interface IYourlsStatResponse {
  statusCode: number;
  message: string;
  link?: IYourlLinkDetail;
}

export interface IYourlsFullStatsRequest {
  format: "json";
  action: "stats";
  username: string;
  password: string;
  filter: "top" | "bottom" | "random";
  limit: number;
}

export interface IYourlsFullStatsResponse {
  stats: {
    total_links: string;
    total_clicks: string;
  };
  statusCode: number;
  message: string;
  links: Record<string, IYourlLinkDetail>[];
}
