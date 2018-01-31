/* global window */

import React from 'react';
import { join } from 'path';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../Button/Button';
import NavigationLink from '../Navigation/NavigationLink';
import TabbedNavigation from './TabbedNavigation';
import { campaignPaths } from '../../helpers/navigation';
import { isCampaignClosed } from '../../helpers';
import SignupButtonFactory from '../SignupButton';

const mapStateToProps = state => ({
  actionText: state.campaign.actionText,
  hasActivityFeed: Boolean(state.campaign.activityFeed.length),
  isAffiliated: state.signups.thisCampaign,
  legacyCampaignId: state.campaign.legacyCampaignId,
  pages: state.campaign.pages,
  pathname: state.routing.location.pathname,
  campaignEndDate: get(state.campaign.endDate, 'date', null),
  template: state.campaign.template,
});

const TabbedNavigationContainer = (props) => {
  const {
    actionText, hasActivityFeed, isAffiliated, legacyCampaignId,
    pages, campaignEndDate, template,
  } = props;

  if (template === 'legacy' && ! isAffiliated) {
    return null;
  }

  const isClosed = isCampaignClosed(campaignEndDate);

  const campaignSlug = props.campaignSlug;

  // Create links for additional "content" pages on this campaign in Contentful.
  const additionalPages = pages
    .filter(page => ! page.fields.hideFromNavigation)
    .map((page) => {
      const pageHasCampaignSlug = page.fields.slug.indexOf(campaignSlug) >= 0;
      let pageSlug = page.fields.slug;

      if (pageHasCampaignSlug) {
        pageSlug = pageSlug.replace(`${campaignSlug}/`, '');
      }

      const path = join('/us/campaigns', campaignSlug, campaignPaths.pages, pageSlug);

      return (
        <NavigationLink key={page.id} to={path}>{page.fields.title}</NavigationLink>
      );
    });

  const SignupButton = SignupButtonFactory(({ clickedSignUp }) => (
    <Button className="-inline nav-button" onClick={() => clickedSignUp(legacyCampaignId)} text={actionText} />
  ), 'tabbed navigation', { text: actionText });

  const shouldHideCommunity = ! hasActivityFeed;
  const shouldHideAction = (isClosed || (shouldHideCommunity && additionalPages.length === 0));

  const isDefaultPage = window.location.pathname === join('/us/campaigns', campaignSlug);
  const defaultPageIsActiveFunction = isFirst => (
    isDefaultPage ? () => isFirst : null
  );

  const actionPagePath = join('/us/campaigns', campaignSlug, campaignPaths.action);

  const ActionNavigationLink = () => (
    shouldHideAction ? null : (
      <NavigationLink
        to={actionPagePath}
        isActive={defaultPageIsActiveFunction(! shouldHideAction)}
      >Action</NavigationLink>
    )
  );

  const communityPagePath = join('/us/campaigns', campaignSlug, campaignPaths.community);
  const CommunityNavigationLink = () => (
    shouldHideCommunity ? null : (
      <NavigationLink
        to={communityPagePath}
        isActive={defaultPageIsActiveFunction(shouldHideAction && ! shouldHideCommunity)}
      >Community</NavigationLink>
    )
  );

  return (
    <TabbedNavigation>
      <div className="nav-items">
        <ActionNavigationLink />
        <CommunityNavigationLink />
        { additionalPages }
      </div>
      { isAffiliated ? null : <SignupButton /> }
    </TabbedNavigation>
  );
};

TabbedNavigationContainer.propTypes = {
  actionText: PropTypes.string.isRequired,
  campaignEndDate: PropTypes.string.isRequired,
  campaignSlug: PropTypes.string.isRequired,
  hasActivityFeed: PropTypes.bool.isRequired,
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
