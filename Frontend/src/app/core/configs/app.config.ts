import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  signalRHubUrl: string;
  apiBaseUrl: string;
  auth: {
    tokenKey: string;
    tokenExpiryKey: string;
    tokenExpiryTime: number;
    tokenRefreshTime: number;
  };
};
