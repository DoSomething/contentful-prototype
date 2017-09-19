import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { CallToActionContainer } from './CallToAction';
import Dashboard from './Dashboard';
import FeedEnclosure from './FeedEnclosure';
import Modal from './Modal';
import LedeBanner from './LedeBanner/LedeBanner';
import TabbedNavigationContainer from '../containers/TabbedNavigationContainer';
import NotificationContainer from '../containers/NotificationContainer';
import CampaignFooter from './CampaignFooter';

const Chrome = props => (
  <div className={classnames({ '-lock': props.shouldShowModal })}>
    <NotificationContainer />
    <Modal />
    <LedeBanner
      isAffiliated={props.isAffiliated}
      title={props.title}
      subtitle={props.subtitle}
      blurb={props.blurb}
      coverImage={props.coverImage}
      legacyCampaignId={props.legacyCampaignId}
      clickedSignUp={props.clickedSignUp}
      endDate={props.endDate}
      template={props.template}
    />
    <div className="main">
      { props.dashboard ?
        <Dashboard
          totalCampaignSignups={props.totalCampaignSignups}
          content={props.dashboard}
          endDate={props.endDate}
        />
        : null }
      <TabbedNavigationContainer />
      <FeedEnclosure>
        {props.children}
      </FeedEnclosure>
      { props.isAffiliated ? null : <CallToActionContainer className="-sticky" /> }
      <CampaignFooter
        affiliateSponsors={props.affiliateSponsors}
        affiliatePartners={props.affiliatePartners}
      />
    </div>
  </div>
);

Chrome.propTypes = {
  blurb: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
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
  }).isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  isAffiliated: PropTypes.bool,
  affiliateSponsors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  affiliatePartners: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  subtitle: PropTypes.string.isRequired,
  template: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  totalCampaignSignups: PropTypes.number.isRequired,
  shouldShowModal: PropTypes.bool.isRequired,
};

Chrome.defaultProps = {
  dashboard: null,
  isAffiliated: false,
};

export default Chrome;
