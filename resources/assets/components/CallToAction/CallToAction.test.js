import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CallToAction from './CallToAction';

const component = shallow(
  <CallToAction
    campaignId="12345"
    tagline="Aenean eu leo quam. Pellentesque ornare sem vestibulum."
    useCampaignTagline
    visualStyle="light"
    isSignedUp={false}
  />,
);

test('CallToAction snapshot test', () => {
  const tree = shallowToJson(component);

  expect(tree).toMatchSnapshot();
});
