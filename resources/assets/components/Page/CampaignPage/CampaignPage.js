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
import { CallToActionContainer } from '../../CallToAction';
import { CampaignSubPageContainer } from '../CampaignSubPage';
import TabbedNavigationContainer from '../../Navigation/TabbedNavigationContainer';
import CampaignFooter from '../../CampaignFooter';
import { CONTENT_MODAL, REPORTBACK_UPLOADER_MODAL } from '../../Modal';

// TODO: If they click a modal link from the action page, this takes them to the root /.
// We should probably make a solution that lets them stay on the page they were already at.

const CampaignPage = (props) => {
  const {
    actionText, affiliatePartners, affiliateSponsors, blurb, campaignLead, coverImage,
    dashboard, endDate, hasActivityFeed, isAffiliated, legacyCampaignId, match,
    openModal, shouldShowActionPage, slug, subtitle, template, title, totalCampaignSignups,
  } = props;

  // TODO: if the history.length > 0, use the history.goBack after you trigger the content modal

  const isClosed = isCampaignClosed(get(endDate, 'date', null));

  const renderActionPage = () => (
    isClosed && ! shouldShowActionPage && hasActivityFeed ?
      <FeedContainer />
      : <ActionPageContainer />
  );

  return (
    <div>
      <LedeBanner
        isAffiliated={isAffiliated}
        title={title}
        subtitle={subtitle}
        blurb={blurb}
        coverImage={coverImage}
        legacyCampaignId={legacyCampaignId}
        endDate={endDate}
        template={template}
        affiliateSponsors={affiliateSponsors}
        actionText={actionText}
      />

      <div className="main clearfix">
        { dashboard ?
          <Dashboard
            totalCampaignSignups={totalCampaignSignups}
            content={dashboard}
            endDate={endDate}
          />
          : null }

        <TabbedNavigationContainer campaignSlug={slug} />

        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <Switch>
            <Route
              path={`${match.url}`}
              exact
              render={renderActionPage}
            />
            <Route
              path={`${match.url}/action`}
              render={renderActionPage}
            />
            <Route
              path={`${match.url}/community`}
              render={() => {
                if (template === 'legacy') {
                  return hasActivityFeed ? <FeedContainer /> : <ActionPageContainer />;
                }

                return <FeedContainer />;
              }}
            />
            <Route path={`${match.url}/pages/:slug`} component={CampaignSubPageContainer} />
            <Route path={`${match.url}/blocks/:id`} component={BlockContainer} />
            <Route path={`${match.url}/quiz/:slug`} component={QuizContainer} />
            <Route
              path={`${match.url}/modal/:id`}
              render={(routingProps) => {
                const { id } = routingProps.match.params;

                switch (id) {
                  case 'reportback':
                    openModal(REPORTBACK_UPLOADER_MODAL);
                    break;
                  default:
                    openModal(CONTENT_MODAL, id);
                    break;
                }

                return <Redirect to={`${match.url}`} />;
              }}
            />
            <Redirect from={`${match.url}/:anything`} to={`${match.url}`} />
          </Switch>
        </Enclosure>
        { ! isAffiliated ? <CallToActionContainer key="callToAction" className="-sticky" /> : null }
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
  actionText: PropTypes.string.isRequired,
  blurb: PropTypes.string,
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
  hasActivityFeed: PropTypes.bool.isRequired,
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  affiliatePartners: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  legacyCampaignId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  slug: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalCampaignSignups: PropTypes.number,
  openModal: PropTypes.func.isRequired,
  shouldShowActionPage: PropTypes.bool.isRequired,
};

CampaignPage.defaultProps = {
  blurb: null,
  dashboard: null,
  endDate: null,
  isAffiliated: false,
  totalCampaignSignups: 0,
  campaignLead: null,
};

export default CampaignPage;
