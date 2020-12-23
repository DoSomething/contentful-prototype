import { env } from '.';

/**
 * Load and return the Facebook SDK.
 */
export function loadFacebookSDK() {
  return new Promise(resolve => {
    if (document.getElementById('facebook-jssdk')) {
      resolve(window.FB);
    }

    // Set init callback for once we've loaded Facebook's SDK:
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: env('FACEBOOK_APP_ID'),
        version: 'v2.8',
      });

      resolve(window.FB);
    };

    const script = document.createElement('script');

    script.id = 'facebook-jssdk';
    script.src = '//connect.facebook.net/en_US/sdk.js';

    document.head.append(script);
  });
}

export default null;
