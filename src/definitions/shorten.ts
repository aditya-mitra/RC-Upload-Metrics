export interface IShortenResultSuccess {
  shortenedUrl: string;
  name: string;
  originalUrl: string;
  message: string;
}

export interface IShortenResultError {
  message: string;
}

export type IShortenResult = IShortenResultSuccess | IShortenResultError;
