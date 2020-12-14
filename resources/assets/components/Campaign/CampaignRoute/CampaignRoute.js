import React, { useEffect } from 'react';
import { join } from 'path';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Modal from '../../utilities/Modal/Modal';
import { isCampaignClosed } from '../../../helpers';
import BlockPage from '../../pages/BlockPage/BlockPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import PostSignupModal from '../../pages/PostSignupModal/PostSignupModal';
import CampaignClosedPage from '../../pages/CampaignPage/CampaignClosedPage';
import CampaignPageContainer from '../../pages/CampaignPage/CampaignPageContainer';
import SixpackExperiment from '../../utilities/SixpackExperiment/SixpackExperiment';

const UngatedCampaignRedirect = ({ baseUrl, campaignIdToNumber }) => {
  useEffect(() => {
    window.sessionStorage.setItem('ungated_session', JSON.stringify('ungated'));
  }, [campaignIdToNumber]);

  return (
    <Redirect
      to={{
        pathname: join(baseUrl, 'action'),
        search: window.location.search,
      }}
    />
  );
};

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
    campaignId,
  } = props;

  const isClosed = isCampaignClosed(endDate);
  const campaignIdToNumber = Number(campaignId);
  const baseUrl = match.url;
  return (
    <>
      {shouldShowAffirmation ? (
        <Modal
          onClose={clickedHideAffirmation}
          trackingId="SIGNUP_AFFIRMATION_MODAL"
        >
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

            if (campaignIdToNumber === 9108 || campaignIdToNumber === 9001) {
              return (
                <SixpackExperiment
                  internalTitle="ungated or gated campaign"
                  convertableActions={['reportback']}
                  control={
                    <LandingPage
                      testName="gated campaign"
                      content={get(props.landingPage, 'fields.content')}
                    />
                  }
                  alternatives={[
                    <UngatedCampaignRedirect
                      baseUrl={baseUrl}
                      campaignIdToNumber={campaignIdToNumber}
                      testName="ungated campaign"
                    />,
                  ]}
                />
              );
            }
            return (
              <LandingPage content={get(props.landingPage, 'fields.content')} />
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

            if (
              !isSignedUp &&
              !window.sessionStorage.getItem('ungated_session')
            ) {
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
  campaignId: PropTypes.string,
};

UngatedCampaignRedirect.propTypes = {
  baseUrl: PropTypes.string,
  campaignIdToNumber: PropTypes.number,
};

CampaignRoute.defaultProps = {
  endDate: null,
  landingPage: {},
  campaignId: null,
};
UngatedCampaignRedirect.defaultProps = {
  baseUrl: null,
  campaignIdToNumber: null,
};

export default CampaignRoute;
