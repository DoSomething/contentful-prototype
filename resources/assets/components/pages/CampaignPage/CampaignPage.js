import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { FeedContainer } from '../../Feed'; // @TODO: rename to ActivityFeed or ActivityPage...
import Modal from '../../utilities/Modal/Modal';
import CampaignFooter from '../../CampaignFooter';
import { isCampaignClosed } from '../../../helpers';
import BlockPageContainer from '../BlockPage/BlockPageContainer';
import ActionPageContainer from '../ActionPage/ActionPageContainer';
import CampaignSubPageContainer from '../CampaignSubPage/CampaignSubPageContainer';
import PostSignupModalContainer from '../../pages/PostSignupModal/PostSignupModalContainer';

const CampaignPage = props => {
  const {
    affiliatePartners,
    affiliateSponsors,
    campaignLead,
    clickedHideAffirmation,
    endDate,
    hasActivityFeed,
    match,
    shouldShowActionPage,
    shouldShowSignupAffirmation,
    template,
  } = props;

  const isClosed = isCampaignClosed(get(endDate, 'date', null));

  // If the campaign is closed (and an admin has not hit the "Show Action Page" button),
  // we want to render the community page (activity feed) if it's available, or
  // if not just render the action page.
  const shouldShowActivityFeed =
    isClosed && !shouldShowActionPage && hasActivityFeed;
  const ActionPageOrActivityFeed = () =>
    shouldShowActivityFeed ? (
      <Redirect to={`${match.url}/community`} />
    ) : (
      <ActionPageContainer />
    );

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
            component={ActionPageOrActivityFeed}
          />
          <Route
            path={`${match.url}/action`}
            component={ActionPageOrActivityFeed}
          />
          <Route
            path={`${match.url}/community`}
            render={() => {
              // Does this campaign have an activity feed? (Some on the
              // "legacy" template don't.) If not, redirect to action page.
              if (template === 'legacy' && !hasActivityFeed) {
                return <Redirect to={`${match.url}/action`} />;
              }

              return <FeedContainer />;
            }}
          />
          <Route
            path={`${match.url}/blocks/:id`}
            component={BlockPageContainer}
          />
          <Route
            path={`${match.url}/quiz/:slug`}
            component={BlockPageContainer}
          />
          {/* @deprecate: remove this Route specification with `/pages/:slug` */}
          <Route
            path={`${match.url}/pages/:slug`}
            component={CampaignSubPageContainer}
          />
          <Route
            path={`${match.url}/:slug`}
            component={CampaignSubPageContainer}
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
  endDate: PropTypes.shape({
    date: PropTypes.string,
    timezone: PropTypes.string,
    timezone_type: PropTypes.number,
  }),
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  hasActivityFeed: PropTypes.bool.isRequired,
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  affiliatePartners: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  match: ReactRouterPropTypes.match.isRequired,
  template: PropTypes.string.isRequired,
  shouldShowActionPage: PropTypes.bool.isRequired,
  shouldShowSignupAffirmation: PropTypes.bool.isRequired,
  clickedHideAffirmation: PropTypes.func.isRequired,
};

CampaignPage.defaultProps = {
  endDate: null,
  campaignLead: null,
};

export default CampaignPage;
