/* global location, jsdom */

import React from 'react';
import { render, shallow } from 'enzyme';
import { createMemoryHistory } from 'history';

import Quiz from './Quiz';
import QuizQuestion from './QuizQuestion';

const history = createMemoryHistory();

history.push = jest.fn();

const sampleChoices = [
  {
    id: '0',
    title: 'title',
    results: ['0'],
    resultBlock: '1',
  },
  {
    id: '1',
    title: 'title',
    results: ['0'],
    resultBlock: '2',
  },
];

const props = {
  id: '1',
  title: 'This is a cool kids quiz',
  additionalContent: {
    introduction: 'Lets do this',
    callToAction:
      'Click **"Get Results"** to find out your likelihood for a match',
  },
  questions: [
    {
      id: '0',
      title: 'title',
      choices: sampleChoices,
    },
    {
      id: '1',
      title: 'title',
      choices: sampleChoices,
    },
  ],
  resultBlocks: [
    {
      id: '1',
      type: 'linkAction',
      fields: {
        title: 'Do it!',
        content: 'Click this link!',
        link: 'https://dosomething.org',
      },
    },
    {
      id: '2',
      type: 'quiz',
      fields: {
        slug: 'quiz-slug-2',
      },
    },
  ],
  results: [
    {
      id: '0',
      content: 'test question',
    },
    {
      id: '1',
      content: 'another one',
    },
    {
      id: '2',
      content: 'another one',
    },
  ],
  slug: 'quiz-slug',
  history,
  location,
  autoSubmit: false,
};

test('it should display a placeholder quiz', () => {
  const wrapper = shallow(<Quiz trackEvent={() => {}} {...props} />);

  expect(wrapper.find('.quiz')).toHaveLength(1);
});

test('the button is disabled when quiz is incomplete', () => {
  const wrapper = render(<Quiz trackEvent={() => {}} {...props} />);

  expect(wrapper.find('button').prop('disabled')).toBe(true);
});

test('the questions are displayed', () => {
  const wrapper = shallow(<Quiz trackEvent={() => {}} {...props} />);

  expect(wrapper.find('QuizQuestion')).toHaveLength(2);
});

test('the button is not disabled when quiz is complete', () => {
  const wrapper = shallow(<Quiz trackEvent={() => {}} {...props} />);
  wrapper.setState({ choices: { 0: '0', 1: '0' } });
  expect(wrapper.find('button').prop('disabled')).toBe(false);
});

test('clicking the button hides the quiz, shows the conclusion, and tracks the conversion', () => {
  const tracker = jest.fn();

  const wrapper = shallow(<Quiz trackEvent={tracker} {...props} />);

  wrapper.setState({ choices: { 0: '0', 1: '0' } });

  wrapper.find('button').simulate('click');

  expect(tracker).toHaveBeenCalled();
  expect(history.push).toHaveBeenCalledTimes(0);
  expect(wrapper.find(QuizQuestion)).toHaveLength(0);
  expect(wrapper.find('ContentfulEntry')).toHaveLength(1);
});

test('a winning quiz resultBlock causes a redirect to the new quiz', () => {
  const tracker = jest.fn();

  jsdom.reconfigure({
    url: 'https://phoenix.test/us/campaigns/test-campaign/quiz/quiz-slug',
  });

  const wrapper = shallow(<Quiz trackEvent={tracker} {...props} />);

  wrapper.setState({ choices: { 0: '1', 1: '1' } });

  wrapper.find('button').simulate('click');

  expect(history.push).toHaveBeenCalled();
  expect(history.push.mock.calls[0][0]).toEqual(
    '/us/campaigns/test-campaign/quiz/quiz-slug-2',
  );
});
