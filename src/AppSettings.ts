export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://CodeEx-backend.azurewebsites.net'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'https://CodeEx-staging.azurewebsites.net'
    : 'https://localhost:7143';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'https://dev-dvvglbrx.us.auth0.com',
  client_id: 'VCN7KhJAwspzXjmjrFe50B2Irns1xiJK',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile email admin CodeEx_DSEAPI app_metadata',
  audience: 'https://CodeEx_DSE',
};
