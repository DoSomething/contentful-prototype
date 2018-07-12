import React from 'react';
import { join } from 'path';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Modal from '../../utilities/Modal/Modal';
import CampaignFooter from '../../CampaignFooter';
import BlockPageContainer from '../../pages/BlockPage/BlockPageContainer';
import ActionPageContainer from '../../pages/ActionPage/ActionPageContainer';
import CampaignPageContainer from '../../pages/CampaignPage/CampaignPageContainer';
import PostSignupModalContainer from '../../pages/PostSignupModal/PostSignupModalContainer';

const CampaignRoute = props => {
  const {
    affiliatePartners,
    affiliateSponsors,
    campaignLead,
    clickedHideAffirmation,
    hasCommunityPage,
    isAdmin,
    isCampaignClosed,
    match,
    shouldShowSignupAffirmation,
  } = props;

  return (
    <div>
      <div>
        {shouldShowSignupAffirmation ? (
          <Modal onClose={clickedHideAffirmation}>
            <PostSignupModalContainer />
          </Modal>
        ) : null}

        <Switch>
          <Route
            path={`${match.url}`}
            exact
            render={() => {
              const path =
                isCampaignClosed && hasCommunityPage ? 'community' : 'action';

              return <Redirect to={join(match.url, path)} />;
            }}
          />

          <Route
            path={join(match.url, 'blocks/:id')}
            component={BlockPageContainer}
          />

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
      <CampaignFooter
        affiliateSponsors={affiliateSponsors}
        affiliatePartners={affiliatePartners}
        campaignLead={campaignLead}
      />
    </div>
  );
};

CampaignRoute.propTypes = {
  affiliatePartners: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  clickedHideAffirmation: PropTypes.func.isRequired,
  hasCommunityPage: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isCampaignClosed: PropTypes.bool.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  shouldShowSignupAffirmation: PropTypes.bool.isRequired,
};

CampaignRoute.defaultProps = {
  campaignLead: null,
};

export default CampaignRoute;
