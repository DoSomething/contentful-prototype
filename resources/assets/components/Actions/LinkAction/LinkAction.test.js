import React from 'react';
import { shallow } from 'enzyme';

import LinkAction from './LinkAction';

describe('LinkAction component', () => {
  const trackEventMock = jest.fn();

  const wrapper = shallow(
    <LinkAction
      title="Click on this link!"
      content="This is a great link"
      trackEvent={trackEventMock}
      link="https://dosomething.org"
      />
  );

  it('renders a Card component', () => {
    expect(wrapper.find("Card")).toHaveLength(1);
    expect(wrapper.find("Card").find("Embed")).toHaveLength(1);
  });

  it('calls the event tracker prop function when the link is clicked', () => {
    wrapper.find('span').simulate('click');
    expect(trackEventMock).toHaveBeenCalled();
  });
});
