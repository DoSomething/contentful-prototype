import React from 'react';
import { shallow } from 'enzyme';
// import { shallowToJson } from 'enzyme-to-json';

import EmbedBlock from './EmbedBlock';

const props = {
  url: 'https://dosomething.org',
};

jest.mock('./EmbedBlockContainer.js', () => 'EmbedBlockContainer');

describe('Embed Block Component', () => {
  test('renders Carto Template with correct URL passed in props', () => {
    const wrapper = shallow(
      <EmbedBlock {...props} url="https://dosomething.carto.com" />,
    );

    expect(wrapper.find('CartoTemplate').length).toEqual(1);
  });

  test('renders Carto Template with correct URL passed in props', () => {
    const wrapper = shallow(
      <EmbedBlock {...props} url="https://dosomething.typeform.com" />,
    );

    expect(wrapper.find('TypeFormTemplate').length).toEqual(1);
  });

  test('renders ErrorBlock if a non-permitted URL is passed', () => {
    const wrapper = shallow(<EmbedBlock {...props} />);

    expect(wrapper.find('ErrorBlock').length).toEqual(1);
  });
});
