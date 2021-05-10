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

export interface IFullStatsResultSuccess {
  links: Record<string, unknown>[];
  totalLinks: string | number;
  totalClicks: string | number;
  message: string;
}

export interface IFullStatsResultError {
  message: string;
}

export type IFullStatsResult = IFullStatsResultSuccess | IFullStatsResultError;
