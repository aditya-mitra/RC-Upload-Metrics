export interface IStatResultSuccess {
  clicks: string | number;
  originalUrl: string;
  shortUrl: string;
  name: string;
  message: string;
  additionalInfo: Record<string, unknown>;
}

export interface IStatResultError {
  message: string;
}

export type IStatResult = IStatResultSuccess | IStatResultError;
