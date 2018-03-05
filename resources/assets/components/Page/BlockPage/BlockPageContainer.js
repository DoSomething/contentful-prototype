import { connect } from 'react-redux';
import { find } from 'lodash';
import BlockPage from './BlockPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;

  const json = find(state.campaign.pages, { id })
    || find(state.campaign.actionSteps, { id })
    || find(state.campaign.activityFeed, { id });

  return { json };
};

// Export the container component.
export default connect(mapStateToProps)(BlockPage);
