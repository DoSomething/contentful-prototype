import React from 'react';
import { shallow } from 'enzyme';

import VoterRegistration from './VoterRegistration';

test('it should render a Card component with a button', () => {
  const wrapper = shallow(<VoterRegistration />);

  expect(wrapper.find('button').length).toEqual(1);
});
