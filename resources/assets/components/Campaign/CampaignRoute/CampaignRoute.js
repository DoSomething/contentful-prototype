import React from 'react';
import { join } from 'path';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import InfoBar from '../../InfoBar/InfoBar';
import Modal from '../../utilities/Modal/Modal';
import BlockPage from '../../pages/BlockPage/BlockPage';
import PostSignupModal from '../../pages/PostSignupModal/PostSignupModal';
import CampaignPageContainer from '../../pages/CampaignPage/CampaignPageContainer';

const CampaignRoute = props => {
  const {
    affiliateCreditText,
    affiliatePartners,
    affiliateSponsors,
    affirmation,
    campaignLead,
    clickedHideAffirmation,
    hasCommunityPage,
    isCampaignClosed,
    location,
    match,
    shouldShowAffirmation,
  } = props;

  return (
    <div>
      <div>
        {shouldShowAffirmation ? (
          <Modal onClose={clickedHideAffirmation}>
            <PostSignupModal affirmation={affirmation || undefined} />
          </Modal>
        ) : null}

        <Switch>
          <Route
            path={`${match.url}`}
            exact
            render={() => {
              const path =
                isCampaignClosed && hasCommunityPage ? 'community' : 'action';

              return (
                <Redirect
                  to={{
                    pathname: join(match.url, path),
                    search: location.search,
                  }}
                />
              );
            }}
          />

          <Route path={join(match.url, 'blocks/:id')} component={BlockPage} />

          <Route
            path={join(match.url, 'quiz/:slug')}
            component={CampaignPageContainer}
          />

          <Route
            path={join(match.url, ':slug')}
            component={CampaignPageContainer}
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
  hasCommunityPage: PropTypes.bool.isRequired,
  isCampaignClosed: PropTypes.bool.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  shouldShowAffirmation: PropTypes.bool.isRequired,
};

CampaignRoute.defaultProps = {
  affiliateCreditText: undefined,
  campaignLead: null,
};

export default CampaignRoute;
