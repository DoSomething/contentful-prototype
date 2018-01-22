import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';
import Question from './Question';
import { ShareContainer } from '../Share';
import Conclusion from './Conclusion';
import './quiz.scss';

const Quiz = (props) => {
  const { id, fields, data, completeQuiz, pickQuizAnswer } = props;
  const { error, shouldSeeResult } = data;

  const introduction = shouldSeeResult ? null : (
    <Markdown className="quiz__description">{fields.introduction}</Markdown>
  );

  const questions = shouldSeeResult ? null : (fields.questions).map(question => (
    <Question
      key={question.id}
      pickQuizAnswer={pickQuizAnswer}
      quizId={id}
      activeAnswer={data.questions ? data.questions[question.id] : null}
      {...question}
    />
  ));

  const quizError = error ? (
    <p className="quiz__error">{data.error}</p>
  ) : null;

  const submitConclusion = shouldSeeResult ? null : (
    <Conclusion callToAction={fields.callToAction}>
      <button
        onClick={() => completeQuiz(id)}
        className="button quiz__submit"
      >get results</button>
    </Conclusion>
  );

  const shareConclusion = shouldSeeResult ? (
    <Conclusion callToAction={fields.conclusion}>
      <ShareContainer
        className="quiz__share"
        parentSource="quiz"
      />
    </Conclusion>
  ) : null;

  return (
    <div className="quiz">
      <div className="quiz__introduction">
        <h1 className="quiz__subtitle">{fields.subtitle || Quiz.defaultProps.fields.subtitle}</h1>
        <h2 className="quiz__title">{fields.title}</h2>
        {introduction}
      </div>
      {questions}
      {quizError}
      {submitConclusion}
      {shareConclusion}
    </div>
  );
};

Quiz.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    comparison: PropTypes.string,
    callToAction: PropTypes.string,
    questions: PropTypes.array,
  }).isRequired,
  data: PropTypes.shape({
    shouldSeeResult: PropTypes.bool,
    questions: PropTypes.object,
    error: PropTypes.string,
  }).isRequired,
  completeQuiz: PropTypes.func.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  data: {
    shouldSeeResult: false,
    questions: {},
    error: null,
  },
  fields: {
    subtitle: 'Quiz',
    introduction: '',
    questions: [],
    conclusion: '',
    comparison: '',
    callToAction: '',
  },
};

export default Quiz;
