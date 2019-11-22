import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import { USER_ACTION_SCHOOL_ID_QUERY } from '../PostForm';
import { USER_POSTS_QUERY } from './PetitionSubmissionAction'; // eslint-disable-line import/no-duplicates
import PetitionSubmissionAction from './PetitionSubmissionAction'; // eslint-disable-line import/no-duplicates

const mocks = [
  {
    request: {
      query: USER_ACTION_SCHOOL_ID_QUERY,
      variables: {
        userId: '1',
        actionIds: [1],
      },
    },
    result: {
      data: {
        action: {},
        user: {},
      },
    },
  },
  {
    request: {
      query: USER_POSTS_QUERY,
      variables: {
        userId: '1',
        actionIds: [1],
      },
    },
    result: {
      data: {
        posts: {},
        user: {},
      },
    },
  },
];

describe('PetitionSubmissionAction component', () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PetitionSubmissionAction
        id="abcdefghi123456789"
        pageId="abcdefghi123456789"
        campaignContentfulId="1"
        content="Test Petition"
        submissions={{
          isPending: false,
          items: {},
        }}
        userId="666655554444333322221111"
        actionId={1}
        resetPostSubmissionItem={jest.fn()}
        storePost={jest.fn()}
      />
    </MockedProvider>,
  );

  test('is rendered as a card component with a form, textarea, submit button, and addtional info card', () => {
    expect(wrapper.find('Card').length).toEqual(2);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(1);
  });
});
