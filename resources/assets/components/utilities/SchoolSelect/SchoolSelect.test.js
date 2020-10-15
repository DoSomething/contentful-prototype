import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import SchoolSelect, { SEARCH_SCHOOLS_QUERY } from './SchoolSelect';

/**
 * Mock the AsyncSelect component to make it easy to find. In order to pass a data-test-id,
 * we'd need to add some custom code that we can skip for now.
 * @see https://stackoverflow.com/a/57854539
 *
 * Note - our identifier needs to be in lower-case form re https://git.io/JvbZ6).
 */
jest.mock('react-select/async', () => 'async-select');

const MOCK_LOCATION = 'US-NJ';
const mockOnChange = () => {};
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

  /**
  TODO: FIX ME

  describe('With a schoolLocation prop', () => {
    // This line fails with React.Children.only expected to receive a single React element child.
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
