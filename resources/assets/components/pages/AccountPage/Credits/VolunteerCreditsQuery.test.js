import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { getHumanFriendlyDate } from '../../../../helpers';

import {
  mockPostsResponse,
  mockParsedPostsData,
} from './volunteer-credits-mock-data.js';

import VolunteerCreditsTable from './VolunteerCreditsTable';
import VolunteerCreditsQuery, {
  VOLUNTEER_CREDIT_POSTS_QUERY,
} from './VolunteerCreditsQuery';

// Mock the VolunteerCreditsTable component to avoid dealing with its nested complexity.
// (Needs to be in lower-case form re https://git.io/JvbZ6).
jest.mock('./VolunteerCreditsTable', () => 'volunteer-credits-table');

const MOCK_USER_ID = '123';

// Mock the user ID we fetch from the window.
global.AUTH = { id: MOCK_USER_ID };

// Mock the GraphQL query and response.
const mocks = [
  {
    request: {
      query: VOLUNTEER_CREDIT_POSTS_QUERY,
      variables: {
        userId: MOCK_USER_ID,
      },
    },
    result: {
      data: {
        paginatedPosts: {
          edges: mockPostsResponse,
        },
      },
    },
  },
];

describe('VolunteerCreditsQuery component', () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <VolunteerCreditsQuery />
    </MockedProvider>,
  );

  test('it renders the VolunteerCreditsTable with a list of processed posts', async () => {
    // This pushes us past the 'first tick' over to when the query actually loads.
    await act(async () => new Promise(resolve => setTimeout(resolve)));

    act(() => {
      // Update the component state with the retrieved mock reponse data.
      wrapper.update();
    });

    expect(wrapper.find('volunteer-credits-table').length).toEqual(1);
    expect(wrapper.find('volunteer-credits-table').prop('posts')).toEqual(
      mockParsedPostsData,
    );
  });
});
