import React from 'react';
import { shallow } from 'enzyme';

import EmbedBlock from './EmbedBlock';

jest.mock('./EmbedBlockContainer.js', () => 'EmbedBlockContainer');

describe('Embed Block Component', () => {
  test('renders Carto Template with correct URL passed in props', () => {
    const wrapper = shallow(<EmbedBlock url="https://dosomething.carto.com" />);

    expect(wrapper.find('CartoTemplate').length).toEqual(1);
  });

  test('renders Carto Template with correct URL passed in props', () => {
    const wrapper = shallow(
      <EmbedBlock url="https://dosomething.typeform.com" />,
    );

    expect(wrapper.find('TypeFormTemplate').length).toEqual(1);
  });

  test('renders Embed component for all other URLs', () => {
    const wrapper = shallow(<EmbedBlock url="https://dosomething.org" />);

    expect(wrapper.find('Embed').length).toEqual(1);
  });
});
