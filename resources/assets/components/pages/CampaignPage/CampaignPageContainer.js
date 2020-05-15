import { get } from 'lodash';
import { connect } from 'react-redux';

import CampaignPage from './CampaignPage';
import { isCampaignClosed } from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  // If we're on a nested quiz route (/campaigns/:slug/quiz/:slug),
  // try and find the associated quiz in state.
  const quizEntry = state.campaign.quizzes.find(
    quiz => quiz.fields.slug === ownProps.match.params.slug,
  );

  return {
    campaignEndDate: state.campaign.endDate,
    isCampaignClosed: isCampaignClosed(state.campaign.endDate),
    landingPage: get(state.campaign, 'landingPage', null),
    noun: get(state.campaign.additionalContent, 'noun'),
    pages: state.campaign.pages,
    quizEntry,
    shouldShowAffirmation: state.signups.shouldShowAffirmation,
    tagline: get(state.campaign.additionalContent, 'tagline'),
    title: state.campaign.title,
    verb: get(state.campaign.additionalContent, 'verb'),
  };
};

// Export the container component.
export default connect(mapStateToProps)(CampaignPage);
