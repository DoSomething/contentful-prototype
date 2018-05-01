import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Button from './Button';

test('Button snapshot test', () => {
  const wrapper = shallow(
    <Button className="-modifier" onClick={() => {}}>
      Text
    </Button>,
  );

  expect(toJson(wrapper)).toMatchSnapshot();
});
