import React from 'react';
import { join } from 'path';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../components/Button/Button';
import NavigationLink from '../components/Navigation/NavigationLink';
import TabbedNavigation from '../components/Navigation/TabbedNavigation';
import { campaignPaths } from '../helpers/navigation';
import { clickedSignUp } from '../actions';
import { isCampaignClosed } from '../helpers';

const mapStateToProps = state => ({
  isAffiliated: state.signups.thisCampaign,
  legacyCampaignId: state.campaign.legacyCampaignId,
  pages: state.campaign.pages,
  pathname: state.routing.location.pathname,
  campaignEndDate: get(state.campaign.endDate, 'date', null),
});

const mapDispatchToProps = {
  clickedSignUp,
};

const TabbedNavigationContainer = (props) => {
  const { isAffiliated, legacyCampaignId, pages, campaignEndDate } = props;

  const isClosed = isCampaignClosed(campaignEndDate);

  const campaignSlug = props.campaignSlug;

  // Create links for additional "content" pages on this campaign in Contentful.
  const additionalPages = pages.map((page) => {
    const path = join('/us/campaigns', campaignSlug, campaignPaths.pages, page.fields.slug);

    return (
      <NavigationLink key={page.id} to={path}>{page.fields.title}</NavigationLink>
    );
  });

  return (
    <TabbedNavigation>
      <div className="nav-items">
        <NavigationLink to={join('/us/campaigns', campaignSlug, campaignPaths.community)} exact>Community</NavigationLink>
        { isClosed ? null : <NavigationLink to={join('/us/campaigns', campaignSlug, campaignPaths.action)}>Action</NavigationLink> }
        { additionalPages }
      </div>
      { isAffiliated ? null : <Button className="-inline nav-button" onClick={() => props.clickedSignUp(legacyCampaignId, { source: 'tabbed navigation|text: Join us' })} /> }
    </TabbedNavigation>
  );
};

TabbedNavigationContainer.propTypes = {
  campaignEndDate: PropTypes.string.isRequired,
  campaignSlug: PropTypes.string.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  legacyCampaignId: PropTypes.string.isRequired,
  pages: PropTypes.oneOfType([
    PropTypes.array,
  ]),
};

TabbedNavigationContainer.defaultProps = {
  pages: [],
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabbedNavigationContainer));
