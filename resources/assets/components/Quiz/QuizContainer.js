import { connect } from 'react-redux';
import { find } from 'lodash';
import Quiz from './Quiz';
import {
  pickQuizAnswer,
  compareQuizAnswer,
  quizInit,
  viewQuizResult,
} from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;

  const quizContent = find(state.campaign.quizzes, { fields: { slug } });
  const quizId = quizContent.id;
  const quizData = state.quiz[quizId];

  return {
    id: quizId,
    fields: quizContent.fields,
    data: quizData,
  };
};

const actions = {
  pickQuizAnswer, compareQuizAnswer, quizInit, viewQuizResult,
};

// Export the container component.
export default connect(mapStateToProps, actions)(Quiz);
