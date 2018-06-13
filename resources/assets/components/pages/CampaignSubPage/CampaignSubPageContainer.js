import { get } from 'lodash';
import { connect } from 'react-redux';

import CampaignSubPage from './CampaignSubPage';
import { findContentfulEntry } from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { id, slug } = ownProps.match.params;

  // @TODO: temporary retrieval of single camapaign page (quiz) based on matched id or slug.
  const entryContent = findContentfulEntry(state, id || slug);

  return {
    campaignEndDate: get(state.campaign.endDate, 'date', null),
    dashboard: state.campaign.dashboard,
    entryContent,
    noun: get(state.campaign.additionalContent, 'noun'),
    pages: state.campaign.pages,
    tagline: get(state.campaign.additionalContent, 'tagline'),
    title: state.campaign.title,
    verb: get(state.campaign.additionalContent, 'verb'),
  };
};

// Export the container component.
export default connect(mapStateToProps)(CampaignSubPage);
