import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/react-testing';
import { fireEvent, render, screen, within } from '@testing-library/react';

import SignupReferralsGallery, {
  SIGNUP_REFERRALS_QUERY,
} from './SignupReferralsGallery';

const MOCK_USER_ID = '123';

// Mock the user ID we fetch from the window.
global.AUTH = { id: MOCK_USER_ID };

// Mock the GraphQL query and response.
const mocks = [
  {
    request: {
      query: SIGNUP_REFERRALS_QUERY,
      variables: {
        referrerUserId: MOCK_USER_ID,
      },
    },
    result: {
      data: {
        signups: [
          // There are two signups from the same user.
          {
            id: 1100,
            user: {
              id: '55767606a59dbf3c7a8b4571',
              displayName: 'Aaron S.',
              __typename: 'User',
            },
            __typename: 'Signup',
          },
          {
            id: 589,
            user: {
              id: '55767606a59dbf3c7a8b4571',
              displayName: 'Aaron S.',
              __typename: 'User',
            },
            __typename: 'Signup',
          },
          {
            id: 992,
            user: {
              id: '5589c991a59dbfa93d8b45ae',
              displayName: 'Chloe L.',
              __typename: 'User',
            },
            __typename: 'Signup',
          },
        ],
      },
    },
  },
];

describe('SignupReferralsGallery component', () => {
  test('it passes a unique list of referred users to the Referrals Gallery', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupReferralsGallery />
      </MockedProvider>,
    );

    // This pushes us past the 'first tick' over to when the GraphQL query actually loads.
    await act(async () => new Promise(resolve => setTimeout(resolve)));

    // This user has two referred signups, but we should only see them once in the gallery.
    expect(screen.getAllByText('Aaron S.').length).toBe(1);
  });
});
