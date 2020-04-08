import React from 'react';
import PropTypes from 'prop-types';

import ButtonLink from '../../utilities/ButtonLink/ButtonLink';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import ContentBlock from '../../blocks/ContentBlock/ContentBlock';
import SignupButtonContainer from '../../SignupButton/SignupButtonContainer';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const VoterRegistrationDrivePage = ({ userId }) => (
  <>
    <SiteNavigationContainer />
    <main>
      <div className="hero-landing-page">
        <div className="base-12-grid bg-gray-100 cover-image py-3 md:py-6">
          <header role="banner" className="hero-banner">
            <h1 className="hero-banner__headline-title">Ready, Set, Vote!</h1>
            <h2 className="hero-banner__headline-subtitle">
              Run an online voter registration drive!
            </h2>
          </header>
        </div>
      </div>
      <div className="bg-white">
        <div className="md:w-3/4 mx-auto py-6 px-3 pitch-landing-page">
          <ContentBlock
            superTitle="Step 1"
            title="Register To Vote"
            content="If you aren’t pre-registered or registered to vote, take 2 minutes to register at your current address. You’ll have the option to  register with an online form or directly with your state."
          />
          <div className="pb-6">
            <ButtonLink
              link={`https://register.rockthevote.com/registrants/new?partner=37187&source=user:${userId},source:web,source_details:onlinedrivereferral,referral=true`}
            >
              Register To Vote
            </ButtonLink>
          </div>
          <div className="pb-6">
            <h1 className="section-header__title font-normal font-league-gothic uppercase text-4xl -underlined pb-3">
              Learn The Facts
            </h1>
            <ul>
              <li>Does my vote actually matter?</li>
              <li>Is registering to vote online safe?</li>
            </ul>
          </div>
          <ContentBlock
            superTitle="Step 2"
            title="Share With Your Friends"
            content="Every time you share your voter registration page before April 30, you'll be entered for a chance at winning a $1,500 scholarship."
          />
          <ButtonLink link="/us/campaigns/online-registration-drive">
            Get Started
          </ButtonLink>
        </div>
      </div>
    </main>
    <SiteFooter />
  </>
);

VoterRegistrationDrivePage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default VoterRegistrationDrivePage;
