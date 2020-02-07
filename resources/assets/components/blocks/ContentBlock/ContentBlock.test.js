import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import ContentBlock from './ContentBlock';

const emptyImage = { url: null, description: null };

const props = {
  superTitle: 'Test Super Title',
  title: 'Test Title',
  content: 'Test Content',
  image: {
    url: 'http://image.com',
    description: 'cool image of http://image.com',
  },
  imageAlignment: 'right',
};

describe('ContentBlock component', () => {
  test('is rendered with the proper child components when image is set', () => {
    const wrapper = shallow(<ContentBlock {...props} />);

    expect(wrapper.find('SectionHeader').length).toEqual(1);
    expect(wrapper.find('Figure').length).toEqual(1);
    expect(wrapper.find('TextContent').length).toEqual(1);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test("does not include SectionHeader when there's no title", () => {
    const wrapper = shallow(<ContentBlock {...props} title={undefined} />);

    expect(wrapper.find('SectionHeader').length).toEqual(0);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('is rendered with the proper child components when image is not set', () => {
    const wrapper = shallow(<ContentBlock {...props} image={emptyImage} />);

    expect(wrapper.find('SectionHeader').length).toEqual(1);
    expect(wrapper.find('Figure').length).toEqual(0);
    expect(wrapper.find('TextContent').length).toEqual(1);
  });

  test('it works beautifully with content and an empty image prop', () => {
    const wrapper = shallow(
      <ContentBlock content="hi there" image={emptyImage} />,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
