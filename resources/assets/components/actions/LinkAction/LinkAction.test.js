import React from 'react';
import { shallow } from 'enzyme';

import LinkAction from './LinkAction';

describe('LinkAction component', () => {
  const props = {
    id: '1234',
    title: 'Click on this link!',
    link: 'https://dosomething.org',
    createdAt: '2020-10-20T20:34:27.427Z',
  };

  const wrapper = shallow(<LinkAction {...props} />);

  it('renders the DefaultTemplate by default', () => {
    expect(wrapper.find('DefaultTemplate')).toHaveLength(1);
  });
});
