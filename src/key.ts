import { getEnvVar } from './utils/index.js';

export const Keys = {
  clientToken: getEnvVar('CLIENT_TOKEN'),
  clientID: getEnvVar('DISCORD_CLIENT_ID'),
  giphyKey: getEnvVar('GIPHY_API_KEY'),
} as const;
