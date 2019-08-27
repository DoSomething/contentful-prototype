import React from 'react';
import { shallow } from 'enzyme';

import LinkAction from './LinkAction';

describe('LinkAction component', () => {
  const props = {
    id: '1234',
    title: 'Click on this link!',
    link: 'https://dosomething.org',
  };

  const wrapper = shallow(<LinkAction {...props} />);

  it('renders the DefaultTemplate by default', () => {
    expect(wrapper.find('DefaultTemplate')).toHaveLength(1);
  });
});
