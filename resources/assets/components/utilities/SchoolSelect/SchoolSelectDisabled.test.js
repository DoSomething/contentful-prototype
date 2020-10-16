import React from 'react';
import AsyncSelect from 'react-select/async';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';

import { requests } from './mocks';
import SchoolSelect from './SchoolSelect';

describe('SchoolSelect component without a schoolLocation prop', () => {
  const testRenderer = TestRenderer.create(
    <MockedProvider mocks={requests} addTypename={false}>
      <SchoolSelect onChange={jest.fn()} />
    </MockedProvider>,
  );
  const testInstance = testRenderer.root;

  /** @test */
  it('renders a disabled AsyncSelect component', async () => {
    expect(testInstance.findByType(AsyncSelect).props.isDisabled).toBe(true);
  });
});
