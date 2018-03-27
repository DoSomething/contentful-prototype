import { find } from 'lodash';
import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';

import { QuizWrapper } from './Quiz';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;

  const quiz = find(state.campaign.quizzes, { fields: { slug } });

  if (! quiz) {
    return { notFound: true };
  }

  const fields = quiz.fields;

  const additionalContent = fields.additionalContent;

  const { callToAction, introduction, questions, resultBlocks, results,
    submitButtonText } = additionalContent;

  return {
    callToAction,
    introduction,
    questions,
    results,
    resultBlocks,
    submitButtonText,
    title: fields.title,
  };
};

export default connect(mapStateToProps)(PuckConnector(QuizWrapper));
