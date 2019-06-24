import React from 'react';
import { join } from 'path';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import InfoBar from '../../InfoBar/InfoBar';
import Modal from '../../utilities/Modal/Modal';
import { isCampaignClosed } from '../../../helpers';
import BlockPage from '../../pages/BlockPage/BlockPage';
import ContentfulEntry from '../../ContentfulEntry/ContentfulEntry';
import PostSignupModal from '../../pages/PostSignupModal/PostSignupModal';
import CampaignClosedPage from '../../pages/CampaignPage/CampaignClosedPage';
import LandingPageContainer from '../../pages/LandingPage/LandingPageContainer';
import CampaignPageContainer from '../../pages/CampaignPage/CampaignPageContainer';

const CampaignRoute = props => {
  const {
    affiliateCreditText,
    affiliatePartners,
    affiliateSponsors,
    affirmation,
    campaignLead,
    clickedHideAffirmation,
    endDate,
    hasCommunityPage,
    isSignedUp,
    location,
    match,
    shouldShowAffirmation,
  } = props;

  const isClosed = isCampaignClosed(endDate);

  return (
    <div>
      <div>
        {shouldShowAffirmation ? (
          <Modal onClose={clickedHideAffirmation}>
            <PostSignupModal affirmation={affirmation || undefined} />
          </Modal>
        ) : null}

        <Switch>
          <Route path={join(match.url, 'blocks/:id')} component={BlockPage} />

          <Route
            path={join(match.url, 'quiz/:slug')}
            component={CampaignPageContainer}
          />

          <Route
            exact
            path={`${match.url}`}
            render={() => {
              if (isClosed) {
                if (hasCommunityPage) {
                  return (
                    <Redirect
                      to={{
                        pathname: join(match.url, 'community'),
                        search: location.search,
                      }}
                    />
                  );
                }

                return <CampaignClosedPage endDate={props.endDate} />;
              }

              if (!isClosed && isSignedUp) {
                return (
                  <Redirect
                    to={{
                      pathname: join(match.url, 'action'),
                      search: location.search,
                    }}
                  />
                );
              }

              // @TODO: temporary function to select component to use based on type.
              // Will be removed once all landing pages use the LandingPage content type.
              return props.landingPage.type === 'page' ? (
                <LandingPageContainer {...props} />
              ) : (
                <ContentfulEntry json={props.landingPage} />
              );
            }}
          />

          <Route
            path={join(match.url, ':slug')}
            render={routeProps => {
              const slug = get(routeProps, 'match.params.slug', null);

              if (isClosed) {
                if (slug === 'community' && hasCommunityPage) {
                  return <CampaignPageContainer {...routeProps} />;
                }

                return (
                  <Redirect
                    to={{
                      pathname: `${match.url}`,
                      search: location.search,
                    }}
                  />
                );
              }

              if (!isSignedUp) {
                return (
                  <Redirect
                    to={{
                      pathname: `${match.url}`,
                      search: location.search,
                    }}
                  />
                );
              }

              return <CampaignPageContainer {...routeProps} />;
            }}
          />
        </Switch>
      </div>
      <InfoBar
        affiliateCreditText={affiliateCreditText}
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
        contactEmail={campaignLead.email || undefined}
      />
    </div>
  );
};

CampaignRoute.propTypes = {
  affiliateCreditText: PropTypes.string,
  affiliatePartners: PropTypes.arrayOf(PropTypes.object).isRequired,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
  affirmation: PropTypes.object.isRequired,
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  clickedHideAffirmation: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  hasCommunityPage: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  landingPage: PropTypes.object,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  shouldShowAffirmation: PropTypes.bool.isRequired,
};

CampaignRoute.defaultProps = {
  affiliateCreditText: undefined,
  campaignLead: null,
  landingPage: {},
};

export default CampaignRoute;
