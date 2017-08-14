import { connect } from 'react-redux';
import { find } from 'lodash';
import Quiz from './Quiz';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const content = find(state.campaign.quizzes, { slug });

  return { content };
};

// Export the container component.
export default connect(mapStateToProps)(Quiz);
