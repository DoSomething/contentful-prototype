/* global window */

import React from 'react';
import { join } from 'path';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignupButton from '../SignupButton';
import { isCampaignClosed } from '../../helpers';
import TabbedNavigation from './TabbedNavigation';
import { campaignPaths } from '../../helpers/navigation';
import NavigationLink from '../Navigation/NavigationLink';

const mapStateToProps = state => ({
  hasActivityFeed: Boolean(state.campaign.activityFeed.length),
  isAffiliated: state.signups.thisCampaign,
  pages: state.campaign.pages,
  pathname: state.routing.location.pathname,
  campaignEndDate: get(state.campaign.endDate, 'date', null),
  campaignSlug: state.campaign.slug,
  template: state.campaign.template,
});

const TabbedNavigationContainer = props => {
  const {
    hasActivityFeed,
    isAffiliated,
    pages,
    campaignEndDate,
    template,
  } = props;

  if (template === 'legacy' && !isAffiliated) {
    return null;
  }

  const isClosed = isCampaignClosed(campaignEndDate);

  const campaignSlug = props.campaignSlug;

  // Create links for any pages referenced on this campaign.
  const additionalPages = pages
    .filter(entry => entry.type === 'page')
    .filter(page => !page.fields.hideFromNavigation)
    .map(page => {
      const pageMissingCampaignSlug =
        page.fields.slug.indexOf(campaignSlug) < 0;
      let pageSlug = page.fields.slug;

      if (pageMissingCampaignSlug) {
        pageSlug = join(campaignSlug, pageSlug);
      }

      const path = join('/us/campaigns', pageSlug);

      return (
        <NavigationLink key={page.id} to={path}>
          {page.fields.title}
        </NavigationLink>
      );
    });

  const shouldHideCommunity = !hasActivityFeed;
  const shouldHideAction =
    isClosed || (shouldHideCommunity && additionalPages.length === 0);

  const isDefaultPage =
    window.location.pathname === join('/us/campaigns', campaignSlug);

  /**
   * Check if the current page is the campaign root `/`,
   * if it is, return a function that returns the value of isFirst.
   *
   * Used to bypass the default `isActive` function on the react-router-dom
   * NavLink.
   *
   * @param  {Boolean} isFirst value describing if this is
   *                           the first page in the list.
   * @return {Function}
   */
  const defaultPageIsActiveFunction = isFirst =>
    isDefaultPage ? () => isFirst : null;

  const actionPagePath = join(
    '/us/campaigns',
    campaignSlug,
    campaignPaths.action,
  );

  const ActionNavigationLink = () =>
    shouldHideAction ? null : (
      <NavigationLink
        to={actionPagePath}
        isActive={defaultPageIsActiveFunction(!shouldHideAction)}
      >
        Action
      </NavigationLink>
    );

  const communityPagePath = join(
    '/us/campaigns',
    campaignSlug,
    campaignPaths.community,
  );

  const CommunityNavigationLink = () =>
    shouldHideCommunity ? null : (
      <NavigationLink
        to={communityPagePath}
        isActive={defaultPageIsActiveFunction(
          shouldHideAction && !shouldHideCommunity,
        )}
      >
        Community
      </NavigationLink>
    );

  const hideTabbedNavigation =
    shouldHideAction && shouldHideCommunity && !additionalPages.length;

  return hideTabbedNavigation ? null : (
    <TabbedNavigation>
      <div className="nav-items">
        <ActionNavigationLink />
        <CommunityNavigationLink />
        {additionalPages}
      </div>
      {isAffiliated ? null : (
        <SignupButton
          className="-inline nav-button"
          source="tabbed navigation"
        />
      )}
    </TabbedNavigation>
  );
};

TabbedNavigationContainer.propTypes = {
  campaignEndDate: PropTypes.string,
  campaignSlug: PropTypes.string.isRequired,
  hasActivityFeed: PropTypes.bool.isRequired,
  isAffiliated: PropTypes.bool.isRequired,
  pages: PropTypes.oneOfType([PropTypes.array]),
  template: PropTypes.string,
};

TabbedNavigationContainer.defaultProps = {
  campaignEndDate: null,
  pages: [],
  template: null,
};

export default withRouter(connect(mapStateToProps)(TabbedNavigationContainer));
