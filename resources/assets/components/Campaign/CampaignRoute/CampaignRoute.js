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
    affirmation,
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
    <>
      {shouldShowAffirmation ? (
        <Modal onClose={clickedHideAffirmation}>
          <PostSignupModal
            affirmation={affirmation || undefined}
            onClose={clickedHideAffirmation}
          />
        </Modal>
      ) : null}

      <Switch>
        <Route
          path={join(baseUrl, 'blocks/:id')}
          render={routeProps => (
            <BlockPage hideNavigation match={routeProps.match} />
          )}
        />

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

              return <CampaignClosedPage endDate={props.endDate} />;
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
                return (
                  <CampaignPageContainer
                    {...routeProps}
                    shouldShowAffirmation={shouldShowAffirmation}
                  />
                );
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

            return (
              <CampaignPageContainer
                {...routeProps}
                shouldShowAffirmation={shouldShowAffirmation}
              />
            );
          }}
        />
      </Switch>
    </>
  );
};

CampaignRoute.propTypes = {
  affirmation: PropTypes.object.isRequired,
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
  endDate: null,
  landingPage: {},
};

export default CampaignRoute;
