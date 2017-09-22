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
import { isCampaignClosed } from '../helpers';
import SignupButtonFactory from '../components/SignupButton';

const mapStateToProps = state => ({
  isAffiliated: state.signups.thisCampaign,
  legacyCampaignId: state.campaign.legacyCampaignId,
  pages: state.campaign.pages,
  pathname: state.routing.location.pathname,
  campaignEndDate: get(state.campaign.endDate, 'date', null),
  template: state.campaign.template,
});

const TabbedNavigationContainer = (props) => {
  const { isAffiliated, legacyCampaignId, pages, campaignEndDate, template } = props;

  if (template === 'legacy') {
    return null;
  }

  const isClosed = isCampaignClosed(campaignEndDate);

  const campaignSlug = props.campaignSlug;

  // Create links for additional "content" pages on this campaign in Contentful.
  const additionalPages = pages.map((page) => {
    const path = join('/us/campaigns', campaignSlug, campaignPaths.pages, page.fields.slug);

    return (
      <NavigationLink key={page.id} to={path}>{page.fields.title}</NavigationLink>
    );
  });

  const SignupButton = SignupButtonFactory(({ clickedSignUp }) => (
    <Button className="-inline nav-button" onClick={() => clickedSignUp(legacyCampaignId)} />
  ), 'tabbed navigation', { text: 'join us' });

  return (
    <TabbedNavigation>
      <div className="nav-items">
        <NavigationLink to={join('/us/campaigns', campaignSlug, campaignPaths.community)} exact>Community</NavigationLink>
        { isClosed ? null : <NavigationLink to={join('/us/campaigns', campaignSlug, campaignPaths.action)}>Action</NavigationLink> }
        { additionalPages }
      </div>
      { isAffiliated ? null : <SignupButton /> }
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
  template: PropTypes.string,
};

TabbedNavigationContainer.defaultProps = {
  pages: [],
  template: null,
};

export default withRouter(connect(mapStateToProps)(TabbedNavigationContainer));
