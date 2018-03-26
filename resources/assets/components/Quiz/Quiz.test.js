import React from 'react';
import { render, shallow } from 'enzyme';
import Quiz from './Quiz';
import QuizQuestion from './QuizQuestion';

const sampleChoice = { id: '0', title: 'title', results: ['0'], resultBlock: '1' };

const props = {
  title: 'This is a cool kids quiz',
  introduction: 'Lets do this',
  results: [
    {
      id: '0',
      content: 'test question',
      blockId: '1',
    },
    {
      id: '1',
      content: 'another one',
      blockId: '1',
    },
    {
      id: '2',
      content: 'another one',
      blockId: '2',
    },
  ],
  callToAction: 'Click **"Get Results"** to find out your likelihood for a match',
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
  ],
  questions: [
    {
      id: '0',
      title: 'title',
      choices: [sampleChoice],
    },
    {
      id: '1',
      title: 'title',
      choices: [sampleChoice],
    },
  ],
};

test('it should display a placeholder quiz', () => {
  const wrapper = shallow(
    <Quiz
      trackEvent={() => {}}
      {...props}
    />,
  );

  expect(wrapper.find('.quiz')).toHaveLength(1);
});


test('the button is disabled when quiz is incomplete', () => {
  const wrapper = render(
    <Quiz
      trackEvent={() => {}}
      {...props}
    />,
  );

  expect(wrapper.find('button').prop('disabled')).toBe(true);
});

test('the questions are displayed', () => {
  const wrapper = shallow(
    <Quiz
      trackEvent={() => {}}
      {...props}
    />,
  );

  expect(wrapper.find('QuizQuestion')).toHaveLength(2);
});


test('the button is not disabled when quiz is complete', () => {
  const wrapper = shallow(
    <Quiz
      trackEvent={() => {}}
      {...props}
    />,
  );
  wrapper.setState({ choices: { 0: '0', 1: '0' } });
  expect(wrapper.find('button').prop('disabled')).toBe(false);
});

test('clicking the button hides the quiz and shows the conclusion and tracks the conversion', () => {
  const tracker = jest.fn();

  const wrapper = shallow(
    <Quiz
      trackEvent={tracker}
      {...props}
    />,
  );

  wrapper.setState({choices: {0: '0', 1: '0'}});

  wrapper.find('button').simulate('click');

  expect(tracker).toHaveBeenCalled();
  expect(wrapper.find(QuizQuestion)).toHaveLength(0);
  expect(wrapper.find('ContentfulEntry')).toHaveLength(1);
});
