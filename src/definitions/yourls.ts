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
}
