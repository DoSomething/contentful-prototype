import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CallToAction from './CallToAction';

// @TODO: Test was failing without having the mock, although it is
// odd that it would need it for a specific test of the component.

// Mock Redux containers so we don't need Provider context.
jest.mock('./CallToActionContainer', () => 'CallToActionContainer');

const component = shallow(
  <CallToAction
    campaignId="12345"
    legacyCampaignId="67890"
    tagline="Aenean eu leo quam. Pellentesque ornare sem vestibulum."
    useCampaignTagline
    visualStyle="light"
  />,
);

test('CallToAction snapshot test', () => {
  const tree = shallowToJson(component);

  expect(tree).toMatchSnapshot();
});
