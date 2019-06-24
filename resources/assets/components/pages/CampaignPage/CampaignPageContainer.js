import { get, has } from 'lodash';
import { connect } from 'react-redux';

import CampaignPage from './CampaignPage';
import {
  findContentfulEntry,
  isCampaignClosed,
  shouldShowLandingPage,
} from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  let entryContent = null;

  if (has(ownProps, 'match.params', null)) {
    const { id, slug } = ownProps.match.params;

    console.log('⛺️', { id, slug, ownProps });

    // @TODO: temporary retrieval of single campaign page (quiz) based on matched id or slug.
    entryContent = findContentfulEntry(state, id || slug);
  }

  return {
    campaignEndDate: state.campaign.endDate,
    dashboard: state.campaign.dashboard,
    entryContent,
    isCampaignClosed: isCampaignClosed(state.campaign.endDate),
    landingPage: get(state.campaign, 'landingPage', null),
    noun: get(state.campaign.additionalContent, 'noun'),
    pages: state.campaign.pages,
    shouldShowLandingPage: shouldShowLandingPage(state, entryContent),
    tagline: get(state.campaign.additionalContent, 'tagline'),
    title: state.campaign.title,
    verb: get(state.campaign.additionalContent, 'verb'),
  };
};

// Export the container component.
export default connect(mapStateToProps)(CampaignPage);
