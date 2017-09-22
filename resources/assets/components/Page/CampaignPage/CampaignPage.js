import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../../Dashboard';
import Enclosure from '../../Enclosure';
import { FeedContainer } from '../../Feed'; // @TODO: rename to ActivityFeed or ActivityPage...
import { QuizContainer } from '../../Quiz';
import { BlockContainer } from '../../Block';
import { isCampaignClosed } from '../../../helpers';
import LedeBanner from '../../LedeBanner/LedeBanner';
import { ActionPageContainer } from '../../ActionPage';
import { CampaignSubPageContainer } from '../CampaignSubPage';
import TabbedNavigationContainer from '../../../containers/TabbedNavigationContainer';
import CampaignFooter from '../../CampaignFooter';

const CampaignPage = (props) => {
  const {
    affiliatePartners, affiliateSponsors, blurb, campaignLead, clickedSignUp, coverImage,
    dashboard, endDate, isAffiliated, legacyCampaignId, match, slug, subtitle, template,
    title, totalCampaignSignups,
  } = props;

  const isClosed = isCampaignClosed(get(endDate, 'date', null));

  return (
    <div>
      <LedeBanner
        isAffiliated={isAffiliated}
        title={title}
        subtitle={subtitle}
        blurb={blurb}
        coverImage={coverImage}
        legacyCampaignId={legacyCampaignId}
        clickedSignUp={clickedSignUp}
        endDate={endDate}
        template={template}
        affiliateSponsors={affiliateSponsors}
      />

      <div className="main">
        { dashboard ?
          <Dashboard
            totalCampaignSignups={totalCampaignSignups}
            content={dashboard}
            endDate={endDate}
          />
          : null }

        <TabbedNavigationContainer campaignSlug={slug} />

        <Enclosure className="margin-top-lg margin-bottom-lg default-container">
          <Switch>
            <Route
              path={`${match.url}`}
              exact
              render={() => (template === 'legacy' ?
                <ActionPageContainer />
                :
                <FeedContainer />
              )}
            />
            <Route
              path={`${match.url}/action`}
              render={() => (isClosed ?
                <Redirect to={`${match.url}`} />
                :
                <ActionPageContainer />
              )}
            />
            <Route path={`${match.url}/pages/:slug`} component={CampaignSubPageContainer} />
            <Route path={`${match.url}/blocks/:id`} component={BlockContainer} />
            <Route path={`${match.url}/quiz/:slug`} component={QuizContainer} />
            <Route
              path={`${match.url}/modal/:id`}
              render={() => {
                console.log(match);
                return <Redirect to={`${match.url}`} />;
              }}
            />
          </Switch>
        </Enclosure>
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
  blurb: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  coverImage: PropTypes.shape({
    description: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  endDate: PropTypes.shape({
    date: PropTypes.string,
    timezone: PropTypes.string,
    timezone_type: PropTypes.number,
  }),
  campaignLead: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  isAffiliated: PropTypes.bool,
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  affiliatePartners: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  legacyCampaignId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  slug: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalCampaignSignups: PropTypes.number,
};

CampaignPage.defaultProps = {
  dashboard: null,
  endDate: null,
  isAffiliated: false,
  totalCampaignSignups: 0,
  campaignLead: undefined,
};

export default CampaignPage;
