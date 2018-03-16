import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import { get, find } from 'lodash';
import Quiz from './Quiz';
import {
  pickWinner,
  replaceStringWithWinner,
  replaceStringWithPercent,
} from './helpers';
import { pickQuizAnswer, completeQuiz } from '../../actions/quiz';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;

  const quizContent = find(state.campaign.quizzes, { fields: { slug } });
  const quizId = quizContent.id;
  const quizData = state.quiz[quizId];
  let quizFields = quizContent.fields;

  const winner = pickWinner(quizData ? quizData.questions : {}, quizFields.questions);
  if (winner) {
    quizFields = {
      ...quizFields,
      conclusion: replaceStringWithWinner(quizFields.conclusion, winner),
      comparison: replaceStringWithPercent(
        replaceStringWithWinner(quizFields.comparison, winner),
      ),
    };
  }

  return {
    id: quizId,
    fields: quizFields,
    data: quizData,
    dashboard: state.campaign.dashboard,
    submitButtonText: get(quizFields, 'additionalContent.submitButtonText'),
    showLedeBanner: get(quizFields, 'additionalContent.showLedeBanner', true),
  };
};

const actions = {
  pickQuizAnswer, completeQuiz,
};

// Export the container component.
export default connect(mapStateToProps, actions)(PuckConnector(Quiz));
