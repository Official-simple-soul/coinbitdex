// config.ts

interface Config {
  apiBaseUrl: string;
  authClientId: string;
  featureFlags: {
    enableAnalytics: boolean;
    showDebugInfo: boolean;
  };
  thirdPartyKeys?: {
    googleMapsApiKey?: string;
  };
}

const development: Config = {
  apiBaseUrl: 'http://localhost:5000/api',
  authClientId: 'dev_client_id',
  featureFlags: {
    enableAnalytics: false,
    showDebugInfo: true,
  },
};

const staging: Config = {
  apiBaseUrl: 'https://staging-api.example.com/api',
  authClientId: 'staging_client_id',
  featureFlags: {
    enableAnalytics: true,
    showDebugInfo: false,
  },
};

const production: Config = {
  apiBaseUrl: 'https://api.example.com/api',
  authClientId: 'prod_client_id',
  featureFlags: {
    enableAnalytics: true,
    showDebugInfo: false,
  },
  thirdPartyKeys: {
    googleMapsApiKey: 'AIza...ProdKey',
  },
};

const environment = process.env.NODE_ENV || 'development';

const config: Config =
  {
    development,
    staging,
    production,
  }[environment] || development;

export default config;
