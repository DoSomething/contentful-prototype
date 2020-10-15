import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import SchoolSelect, { SEARCH_SCHOOLS_QUERY } from './SchoolSelect';

// Mock the AsyncSelect component to make it easy to find.
// (Needs to be in lower-case form re https://git.io/JvbZ6).
jest.mock('react-select/async', () => 'async-select');

// Mock a location.
const MOCK_LOCATION = 'US-NJ';
const mockOnChange = () => {};

// Mock the GraphQL query and response.
const mocks = [
  {
    request: {
      query: SEARCH_SCHOOLS_QUERY,
      variables: {
        location: MOCK_LOCATION,
        name: null,
      },
    },
    result: {
      data: {
        searchSchools: [],
      },
    },
  },
];

describe('SchoolSelect component', () => {
  describe('Without a schoolLocation prop', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SchoolSelect onChange={mockOnChange} />
      </MockedProvider>,
    );

    /** @test */
    it('renders a disabled select component', async () => {
      const asyncSelect = wrapper.find('async-select');

      expect(asyncSelect.prop('isDisabled')).toBe(true);
    });
  });

  /*
  describe('With a schoolLocation prop', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SchoolSelect location={MOCK_LOCATION} onChange={mockOnChange}/>,
      </MockedProvider>,
    );

 
    it('renders a enabled select component', async () => {
      const asyncSelect = wrapper.find('async-select');

      expect(asyncSelect.prop('isDisabled')).toBe(false);
    });
  });
  */
});
