import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import { get } from 'lodash';
import LegacyQuiz from './LegacyQuiz';
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
  const quizContent = ownProps.quizContent;
  const quizId = quizContent.id;
  const quizData = state.quiz[quizId];
  let quizFields = quizContent.fields;

  const winner = pickWinner(
    quizData ? quizData.questions : {},
    quizFields.questions,
  );
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
    submitButtonText: get(quizFields, 'additionalContent.submitButtonText'),
  };
};

const actions = {
  pickQuizAnswer,
  completeQuiz,
};

// Export the container component.
export default connect(mapStateToProps, actions)(PuckConnector(LegacyQuiz));
