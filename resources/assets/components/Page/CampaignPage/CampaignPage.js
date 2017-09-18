import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../../Dashboard';
import Enclosure from '../../Enclosure';
import { FeedContainer } from '../../Feed'; // @TODO: rename to ActivityFeed or ActivityPage...
import { QuizContainer } from '../../Quiz';
import { BlockContainer } from '../../Block';
import LedeBanner from '../../LedeBanner/LedeBanner';
import { ActionPageContainer } from '../../ActionPage';
import { CampaignSubPageContainer } from '../CampaignSubPage';
import TabbedNavigationContainer from '../../../containers/TabbedNavigationContainer';

const CampaignPage = (props) => {
  const {
    blurb, clickedSignUp, coverImage, dashboard, endDate, isAffiliated,
    legacyCampaignId, match, slug, subtitle, template, title, totalCampaignSignups,
  } = props;

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

        <Enclosure className="margin-top-lg margin-bottom-lg col-default">
          <Switch>
            <Route path={`${match.url}`} exact component={FeedContainer} />
            <Route path={`${match.url}/action`} component={ActionPageContainer} />
            <Route path={`${match.url}/pages/:slug`} component={CampaignSubPageContainer} />
            <Route path={`${match.url}/blocks/:id`} component={BlockContainer} />
            <Route path={`${match.url}/quiz/:slug`} component={QuizContainer} />
          </Switch>
        </Enclosure>
      </div>
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
  isAffiliated: PropTypes.bool,
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
};

export default CampaignPage;
