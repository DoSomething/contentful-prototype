import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import Markdown from '../Markdown';
import Question from './Question';
import Conclusion from './Conclusion';
import Enclosure from '../Enclosure';
import { ShareContainer } from '../Share';
import DashboardContainer from '../Dashboard/DashboardContainer';
import LedeBannerContainer from '../LedeBanner/LedeBannerContainer';
import TabbedNavigationContainer from '../Navigation/TabbedNavigationContainer';
import { ShareActionContainer } from '../ShareAction';
import LinkActionContainer from '../Actions/LinkAction';

import './quiz.scss';

const Quiz = (props) => {
  const { id, fields, data, dashboard, completeQuiz,
    pickQuizAnswer, trackEvent, showLedeBanner } = props;
  const { error, shouldSeeResult, selectedResult } = data;

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

  const showResultingAction = () => {
    const action = find(fields.results, { id: selectedResult });

    const actionProps = {
      ...action.fields,
      content: `${fields.conclusion}\n${action.fields.content}`,
    };

    switch (action.type.sys.id) {
      case 'linkAction':
        return <LinkActionContainer {...actionProps} />;

      case 'shareAction':
        return <ShareActionContainer {...actionProps} />;

      default:
        return null;
    }
  };

  if (shouldSeeResult) {
    trackEvent('converted on quiz', {
      responses: data.questions,
    });
  }

  return (
    <div>
      { showLedeBanner ? <LedeBannerContainer /> : null }
      <div className="main clearfix">
        { dashboard && showLedeBanner ? <DashboardContainer /> : null }
        { showLedeBanner ? <TabbedNavigationContainer /> : null }
        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <div className="quiz">
            <div className="quiz__introduction">
              <h1 className="quiz__subtitle">{fields.subtitle || Quiz.defaultProps.fields.subtitle}</h1>
              <h2 className="quiz__title">{fields.title}</h2>
              {introduction}
            </div>

            {questions}

            {quizError}

            {submitConclusion}

            {fields.resultActions && selectedResult ? showResultingAction(selectedResult) : shareConclusion}
          </div>
        </Enclosure>
      </div>
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
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  completeQuiz: PropTypes.func.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  showLedeBanner: PropTypes.bool.isRequired,
  trackEvent: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  data: {
    shouldSeeResult: false,
    questions: {},
    error: null,
  },
  dashboard: null,
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
