import React from 'react';
import { shallow } from 'enzyme';

import EmbedBlock from './EmbedBlock';

describe('Embed Block Component', () => {
  /** @test */
  test('renders Iframe embed for dosomething.carto URL', () => {
    const wrapper = shallow(
      <EmbedBlock url="https://dosomething.carto.com" id="123" />,
    );

    expect(wrapper.find('IframeEmbed').length).toEqual(1);
  });

  /** @test */
  test('renders Typeform template for dosomething.typeform URL', () => {
    const wrapper = shallow(
      <EmbedBlock url="https://dosomething.typeform.com" />,
    );

    expect(wrapper.find('TypeFormTemplate').length).toEqual(1);
  });

  /** @test */
  test('renders Iframe embed for airtable URL', () => {
    const wrapper = shallow(
      <EmbedBlock url="https://airtable.com/embed" id="123" />,
    );

    expect(wrapper.find('IframeEmbed').length).toEqual(1);
  });

  /** @test */
  test('renders Embed component for youtube URLs', () => {
    let wrapper = shallow(
      <EmbedBlock url="https://www.youtube.com/watch?v=123" />,
    );

    expect(wrapper.find('Embed').length).toEqual(1);

    wrapper = shallow(<EmbedBlock url="https://youtu.be/123" />);

    expect(wrapper.find('Embed').length).toEqual(1);
  });

  /** @test */
  test('renders Embed component for all other URLs', () => {
    const wrapper = shallow(<EmbedBlock url="https://dosomething.org" />);

    expect(wrapper.find('ErrorBlock').length).toEqual(1);
  });
});
