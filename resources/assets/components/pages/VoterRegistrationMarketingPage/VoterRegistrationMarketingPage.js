import React from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import {
  contentfulImageUrl,
  contentfulImageSrcset,
} from '../../../helpers/contentful';

const coverImage =
  'https://images.ctfassets.net/81iqaqpfd8fy/2bdz45WOkQRw0X0bzS6DJ6/0d3af059a19eec329c34aa2935866810/general-scholarship-1910px.png';

const srcset = contentfulImageSrcset(coverImage, [
  { height: 250, width: 250 },
  { height: 250, width: 800 },
  { height: 450, width: 1400 },
]);

const logo =
  'https://images.ctfassets.net/81iqaqpfd8fy/SeD5JGpeLfF9BDoDPwwEu/1969bd8c18a1dc67720d9e10e3d4640b/Niche-logo---Horizontal-white.png';

const VoterRegistrationMarketingPage = () => (
  <>
    <SiteNavigationContainer />

    <main>
      <article>
        <img
          srcSet={srcset}
          src={contentfulImageUrl(coverImage, '1400', '450', 'fill')}
        />

        <div style={{ backgroundColor: '#309450' }} className="p-4">
          <img className="m-auto" src={contentfulImageUrl(logo, '250', '60')} />

          <h1 className="md:leading-none text-white text-center uppercase font-league-gothic font-normal text-5xl md:text-6xl">
            Niche wants you to vote
          </h1>

          <h2 className="text-white text-center text-lg">
            Take 2 minutes to register to vote at your current address.
          </h2>
        </div>

        <SocialShareTray
          className="text-center"
          // Pass through the current URL without the query parameters.
          shareLink={window.location.href.split('?')[0]}
          platforms={['facebook', 'twitter']}
        />
      </article>
    </main>

    <SiteFooter />
  </>
);

export default VoterRegistrationMarketingPage;
