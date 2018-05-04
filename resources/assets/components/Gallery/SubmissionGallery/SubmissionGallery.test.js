import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SubmissionGallery from './SubmissionGallery';

const mediaItem = {
  media: {
    uri: 'http://fakelink.com',
  },
};

test('it renders correctly with required props', () => {
  const component = shallow(
    <SubmissionGallery
      fetchUserReportbacks={() => {}}
      legacyCampaignId="1234"
      legacyCampaignRunId="5678"
      submissions={{
        isFetching: false,
        items: [mediaItem],
      }}
      userId="12345randomid6789"
    />,
  );

  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('it renders loader while fetching', () => {
  const component = shallow(
    <SubmissionGallery
      fetchUserReportbacks={() => {}}
      legacyCampaignId="1234"
      legacyCampaignRunId="5678"
      submissions={{
        isFetching: true,
        items: [mediaItem],
      }}
      userId="12345randomid6789"
    />,
  );

  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
