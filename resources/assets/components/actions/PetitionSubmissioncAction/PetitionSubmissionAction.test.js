import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import { USER_POSTS_QUERY } from './PetitionSubmissionAction';
import PetitionSubmissionAction from './PetitionSubmissionAction';

const mocks = [
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
