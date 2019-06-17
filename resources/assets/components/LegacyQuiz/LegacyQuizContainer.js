import { connect } from 'react-redux';
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
    campaignId: state.campaign.campaignId,
    data: quizData,
    fields: quizFields,
    id: quizId,
    pageId: state.campaign.id || state.page.id,
    submitButtonText: get(quizFields, 'additionalContent.submitButtonText'),
  };
};

const actions = {
  pickQuizAnswer,
  completeQuiz,
};

// Export the container component.
export default connect(
  mapStateToProps,
  actions,
)(LegacyQuiz);
