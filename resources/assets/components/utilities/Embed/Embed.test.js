import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import Embed, { EMBED_QUERY } from './Embed';
import { trackAnalyticsEvent as trackEventMock } from '../../../helpers/analytics';

jest.mock('../../../helpers/analytics');

// Mock the GraphQL query and response.
const mocks = [
  {
    request: {
      query: EMBED_QUERY,
      variables: {
        url: 'https://ds.co',
      },
    },
    result: {
      data: {
        embed: {
          type: 'link',
          title: 'DS.ORG',
          providerName: 'DoSomething',
          thumbnailUrl: 'https://nail-thumbs.gov',
          description: 'A cool site',
          html: null,
        },
      },
    },
  },
];

describe('Embed component', () => {
  it('triggers an analytics event when the link is clicked', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Embed url="https://ds.co" />
      </MockedProvider>,
    );

    wrapper.find('a').simulate('click');

    expect(trackEventMock).toHaveBeenCalled();
  });

  describe('with the noTrack prop', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Embed url="https://ds.co" noTrack />
      </MockedProvider>,
    );

    it('does not trigger an analytics click event when link is clicked', () => {
      wrapper.find('a').simulate('click');

      expect(trackEventMock).toHaveBeenCalledTimes(0);
    });
  });
});
