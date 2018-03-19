import React from 'react';
import { every } from 'lodash';
import PropTypes from 'prop-types';

import Enclosure from '../Enclosure';
import { Flex, FlexCell } from '../Flex';
import QuizQuestion from './QuizQuestion';
import QuizConclusion from './QuizConclusion';
import DashboardContainer from '../Dashboard/DashboardContainer';
import LedeBannerContainer from '../LedeBanner/LedeBannerContainer';
import TabbedNavigationContainer from '../Navigation/TabbedNavigationContainer';

import './quiz-alt.scss';

const defaultTitle = 'Do you know how to build an ark?';
const defaultIntroduction = 'With the current state of moral decay in the world, there\'s bound to be another flood as a result of God\'s mighty and vicious wrath. See if you have the know-how to build an ark and save yourself (and your cat) from impending doom.';
const defaultQuestions = [
  {
    id: '0',
    title: 'What is an ark?',
    choices: [
      { id: '0', title: 'The Arc de Triomphe' },
      { id: '1', title: 'A luminous electrical discharge between two electrodes or other points.' },
      { id: '2', title: 'A harp' },
      { id: '3', title: 'Gimme a Kit Kat and I might tell ya about it' },
    ],
  },
  {
    id: '1',
    title: 'What would you use to attach a nail to a piece of wood?',
    choices: [
      { id: '0', title: 'The Arc de Triomphe' },
      { id: '1', title: 'A hammer' },
      { id: '2', title: 'My annoying little brother' },
      { id: '3', title: 'Trump' },
      { id: '4', title: 'There are no nails in a barge' },
    ],
  },
  {
    id: '2',
    title: 'What would you use to attach a nail to a piece of wood?',
    choices: [
      { id: '0', title: 'one', backgroundImage: 'https://images.contentful.com/81iqaqpfd8fy/1N1pKu1dyweQwY4Im0coKY/7def3323b3fdcde66b01cf3183eb2cde/stm-share-a-03__1_.png' },
      { id: '1', title: 'two', backgroundImage: 'https://images.contentful.com/81iqaqpfd8fy/1N1pKu1dyweQwY4Im0coKY/7def3323b3fdcde66b01cf3183eb2cde/stm-share-a-03__1_.png' },
      { id: '2', title: 'three', backgroundImage: 'https://images.contentful.com/81iqaqpfd8fy/1N1pKu1dyweQwY4Im0coKY/7def3323b3fdcde66b01cf3183eb2cde/stm-share-a-03__1_.png' },
      { id: '3', title: 'four', backgroundImage: 'https://images.contentful.com/81iqaqpfd8fy/1N1pKu1dyweQwY4Im0coKY/7def3323b3fdcde66b01cf3183eb2cde/stm-share-a-03__1_.png' },
      { id: '4', title: 'five', backgroundImage: 'https://images.contentful.com/81iqaqpfd8fy/1N1pKu1dyweQwY4Im0coKY/7def3323b3fdcde66b01cf3183eb2cde/stm-share-a-03__1_.png' },
    ],
  },
];

const defaultSubmitButtonText = 'Get Results';

const defaultCallToAction = 'Click **"Get Results"** to find out your likelihood for a match';

const defaultConclusionText = 'Genetic compatibility is key for finding a match, which means the more diverse the registry is, the more lives we’ll save.';

const defaultShowLedeBanner = false;

class QuizAlt extends React.Component {
  constructor() {
    super();

    this.state = {
      choices: {},
    };

    this.selectChoice = this.selectChoice.bind(this);
    this.completedQuiz = this.completedQuiz.bind(this);
    this.completeQuiz = this.completeQuiz.bind(this);
  }

  selectChoice(questionId, choiceId) {
    const choices = Object.assign({}, this.state.choices);
    choices[questionId] = choiceId;
    this.setState({ choices });
  }

  completedQuiz() {
    return every(this.props.questions, question => (
      !! this.state.choices[question.id]
    ));
  }

  completeQuiz() {
    if (this.completedQuiz()) {
      this.props.trackEvent('converted on quiz', {
        responses: this.state.choices,
      });
      this.setState({ showResults: true });
    }
  }

  render() {
    const { callToAction, conclusionText, dashboard, introduction,
      questions, showLedeBanner, submitButtonText, title } = this.props;

    const showResults = this.state.showResults;

    const quizQuestions = questions.map(question => (
      <QuizQuestion
        key={question.id}
        id={question.id}
        title={question.title}
        choices={question.choices}
        selectChoice={this.selectChoice}
        activeChoiceId={this.state.choices[question.id]}
      />
    ));

    const quizConclusion = showResults ? <h1>{conclusionText}</h1> : (
      <QuizConclusion callToAction={callToAction}>
        <button
          onClick={() => this.completeQuiz()}
          className="button quiz__submit"
          disabled={! this.completedQuiz()}
        >{submitButtonText || 'Get Resultss'}</button>
      </QuizConclusion>
    );

    return (
      <div>

        { showLedeBanner ? <LedeBannerContainer /> : null }

        <div className="main clearfix">

          { dashboard && showLedeBanner ? <DashboardContainer /> : null }

          { showLedeBanner ? <TabbedNavigationContainer /> : null }

          <Enclosure className="default-container margin-top-xlg margin-bottom-lg">
            <Flex className="quiz">
              <FlexCell width="two-thirds">
                <h1 className="quiz__heading">Quiz</h1>
                <h2 className="quiz__title">{ title }</h2>

                { showResults ? null : introduction }

                { showResults ? null : quizQuestions }

                { quizConclusion }
              </FlexCell>
            </Flex>
          </Enclosure>
        </div>
      </div>
    );
  }
}

QuizAlt.propTypes = {
  callToAction: PropTypes.string,
  conclusionText: PropTypes.string,
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  introduction: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object).isRequired,
  })),
  showLedeBanner: PropTypes.bool,
  submitButtonText: PropTypes.string,
  title: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
};

QuizAlt.defaultProps = {
  callToAction: defaultCallToAction,
  conclusionText: defaultConclusionText,
  dashboard: null,
  introduction: defaultIntroduction,
  questions: defaultQuestions,
  showLedeBanner: defaultShowLedeBanner,
  submitButtonText: defaultSubmitButtonText,
  title: defaultTitle,
};

export default QuizAlt;
