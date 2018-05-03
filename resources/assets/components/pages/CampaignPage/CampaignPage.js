import React from 'react';
import { join } from 'path';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { FeedContainer } from '../../Feed'; // @TODO: rename to ActivityFeed or ActivityPage...
import Modal from '../../utilities/Modal/Modal';
import CampaignFooter from '../../CampaignFooter';
import BlockPageContainer from '../BlockPage/BlockPageContainer';
import ActionPageContainer from '../ActionPage/ActionPageContainer';
import CampaignSubPageContainer from '../CampaignSubPage/CampaignSubPageContainer';
import PostSignupModalContainer from '../../pages/PostSignupModal/PostSignupModalContainer';
import GeneralPageContainer from '../../pages/GeneralPage/GeneralPageContainer';

const CampaignPage = props => {
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
            path={join(match.url, 'action')}
            render={() => {
              if (isCampaignClosed && hasCommunityPage && !isAdmin) {
                return <Redirect to={join(match.url, 'community')} />;
              }

              return <ActionPageContainer />;
            }}
          />

          <Route
            path={join(match.url, 'community')}
            render={() => {
              if (!hasCommunityPage) {
                return <Redirect to={join(match.url, 'action')} />;
              }

              return <FeedContainer />;
            }}
          />

          <Route
            path={join(match.url, 'blocks/:id')}
            component={BlockPageContainer}
          />

          <Route
            path={join(match.url, 'quiz/:slug')}
            component={BlockPageContainer}
          />

          {/* @deprecate: remove this Route specification with `/pages/:slug` */}
          <Route
            path={join(match.url, 'pages/:slug')}
            component={CampaignSubPageContainer}
          />

          <Route
            path={join(match.url, ':slug')}
            component={GeneralPageContainer}
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

CampaignPage.propTypes = {
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

CampaignPage.defaultProps = {
  campaignLead: null,
};

export default CampaignPage;
