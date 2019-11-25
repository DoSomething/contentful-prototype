import React from 'react';
import { join } from 'path';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../../NotFound';
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

  const baseUrl = match.url;

  return (
    <React.Fragment>
      {shouldShowAffirmation ? (
        <Modal onClose={clickedHideAffirmation}>
          <PostSignupModal
            affirmation={affirmation || undefined}
            onClose={clickedHideAffirmation}
          />
        </Modal>
      ) : null}

      <Switch>
        <Route path={join(baseUrl, 'blocks/:id')} component={BlockPage} />

        <Route
          path={join(baseUrl, 'quiz/:slug')}
          component={CampaignPageContainer}
        />

        <Route
          exact
          path={baseUrl}
          render={() => {
            if (isClosed) {
              if (hasCommunityPage) {
                return (
                  <Redirect
                    to={{
                      pathname: join(baseUrl, 'community'),
                      search: location.search,
                    }}
                  />
                );
              }

              return (
                <CampaignClosedPage
                  endDate={props.endDate}
                  affiliateCreditText={affiliateCreditText}
                  affiliatePartners={affiliatePartners}
                  affiliateSponsors={affiliateSponsors}
                  campaignLead={campaignLead}
                />
              );
            }

            if (!isClosed && isSignedUp) {
              return (
                <Redirect
                  to={{
                    pathname: join(baseUrl, 'action'),
                    search: location.search,
                  }}
                />
              );
            }

            if (!props.landingPage) {
              return <NotFound />;
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
          path={join(baseUrl, ':slug')}
          render={routeProps => {
            const slug = get(routeProps, 'match.params.slug', null);

            if (isClosed) {
              if (slug === 'community' && hasCommunityPage) {
                return <CampaignPageContainer {...routeProps} />;
              }

              return (
                <Redirect
                  to={{
                    pathname: baseUrl,
                    search: location.search,
                  }}
                />
              );
            }

            if (!isSignedUp) {
              return (
                <Redirect
                  to={{
                    pathname: baseUrl,
                    search: location.search,
                  }}
                />
              );
            }

            return <CampaignPageContainer {...routeProps} />;
          }}
        />
      </Switch>
    </React.Fragment>
  );
};

CampaignRoute.propTypes = {
  affiliateCreditText: PropTypes.string,
  affiliatePartners: PropTypes.arrayOf(PropTypes.object),
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affirmation: PropTypes.object.isRequired,
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  clickedHideAffirmation: PropTypes.func.isRequired,
  endDate: PropTypes.string,
  hasCommunityPage: PropTypes.bool.isRequired,
  isSignedUp: PropTypes.bool.isRequired,
  landingPage: PropTypes.object,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  shouldShowAffirmation: PropTypes.bool.isRequired,
};

CampaignRoute.defaultProps = {
  affiliateCreditText: undefined,
  affiliatePartners: [],
  affiliateSponsors: [],
  campaignLead: {},
  endDate: null,
  landingPage: {},
};

export default CampaignRoute;
