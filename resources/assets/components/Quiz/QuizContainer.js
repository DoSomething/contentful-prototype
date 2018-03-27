import { find } from 'lodash';
import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';

import Quiz from './Quiz';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;

  const quiz = find(state.campaign.quizzes, { fields: { slug } });

  const fields = quiz ? quiz.fields : null;

  return {
    fields,
  };
};

export default connect(mapStateToProps)(PuckConnector(Quiz));
