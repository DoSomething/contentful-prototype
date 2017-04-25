import { connect } from 'react-redux';
import CompetitionBlock from '../components/CompetitionBlock';
import { joinCompetition } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => ({
  campaignId: state.campaign.legacyCampaignId,
  hasJoinedCompetition: state.competitions.thisCampaign,
  hasPendingJoin: state.competitions.isPending,
  showConfirmation: state.competitions.showConfirmation,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  joinCompetition,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(CompetitionBlock);
