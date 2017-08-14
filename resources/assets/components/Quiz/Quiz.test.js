import React from 'react';
import { shallow } from 'enzyme';
import Quiz from './Quiz';
import Question from './Question';

// Mock Redux containers so we don't need Provider context.
jest.mock('./QuizContainer', () => 'QuizContainer');

test('it should display a placeholder quiz', () => {
  const wrapper = shallow(<Quiz quiz={{ title: "test title", json: { questions: [] } }} />);
  expect(wrapper.find('div.quiz')).toHaveLength(1);
});
