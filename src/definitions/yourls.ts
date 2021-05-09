export interface IYourlsShortenRequest {
  format: 'json';
  action: 'shorturl';
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
  status: 'success' | 'fail';
  url?: {
    keyword: string;
    url: string;
    data: string;
  };
}

export interface IYourlsStatRequest {
  format: 'json';
  action: 'url-stats';
  shorturl: string;
  username: string;
  password: string;
}

export interface IYourlsStatResponse {
  statusCode: number;
  message: string;
  link?: {
    shorturl: string;
    title: string;
    timestamp: string;
    clicks: string;
    url: string;
  };
}
