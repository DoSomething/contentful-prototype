import React from 'react';
import { mount } from 'enzyme';
import Quiz from './Quiz';

// Mock Redux containers so we don't need Provider context.
jest.mock('./QuizContainer', () => 'QuizContainer');

test('it should display a placeholder quiz', () => {
  const wrapper = mount(
    <Quiz
      id="1"
      fields={{
        callToAction: 'do it',
        conclusion: 'conclusion',
        introduction: 'introduction',
        title: 'test title',
        questions: [],
      }}
      completeQuiz={() => {}}
      viewQuizResult={() => {}}
      startQuiz={() => {}}
      pickQuizAnswer={() => {}}
    />,
  );

  expect(wrapper.find(Quiz)).toHaveLength(1);
});
