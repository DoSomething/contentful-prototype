import React from 'react';
import AsyncSelect from 'react-select/async';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';

import SchoolSelect from './SchoolSelect';
import { location, requests } from './mocks';

describe('SchoolSelect component with schoolLocation prop', () => {
  const testRenderer = TestRenderer.create(
    <MockedProvider mocks={requests} addTypename={false}>
      <SchoolSelect schoolLocation={location} onChange={jest.fn()} />
    </MockedProvider>,
  );
  const testInstance = testRenderer.root;

  /** @test */
  it('renders an enabled AsyncSelect component', async () => {
    expect(testInstance.findByType(AsyncSelect).props.isDisabled).toBe(false);
  });
});
