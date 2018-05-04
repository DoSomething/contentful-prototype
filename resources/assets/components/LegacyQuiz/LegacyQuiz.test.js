import React from 'react';
import { mount } from 'enzyme';

import LegacyQuiz from './LegacyQuiz';

// Mock Redux containers so we don't need Provider context.
jest.mock('./LegacyQuizContainer', () => 'LegacyQuizContainer');

test('it should display a placeholder quiz', () => {
  const wrapper = mount(
    <LegacyQuiz
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
      trackEvent={() => {}}
      pickQuizAnswer={() => {}}
      showLedeBanner={false}
    />,
  );

  expect(wrapper.find(LegacyQuiz)).toHaveLength(1);
});
