import React from 'react';
import { shallow } from 'enzyme';

import PetitionSubmissionAction from './PetitionSubmissionAction';

describe('PetitionSubmissionAction component', () => {
  const wrapper = shallow(
    <PetitionSubmissionAction
      id="abcdefghi123456789"
      content="Test Petition"
    />,
  );

  test('is rendered as a card component with a form, textarea, submit button, and addtional info card', () => {
    expect(wrapper.find('Card').length).toEqual(2);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(1);
  });
});
