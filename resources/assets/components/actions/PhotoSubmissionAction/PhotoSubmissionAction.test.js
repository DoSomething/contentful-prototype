import React from 'react';
import { shallow } from 'enzyme';

import PhotoSubmissionAction from './PhotoSubmissionAction';

jest.mock('../../../helpers/api');

describe('PhotoSubmissionAction component', () => {
  const id = 'abcdefghi123456789';

  const wrapper = shallow(
    <PhotoSubmissionAction
      automatedTest={true}
      campaignContentfulId="1"
      campaignId="1234"
      id={id}
      pageId={id}
      resetPostSubmissionItem={jest.fn()}
      storeCampaignPost={jest.fn()}
      submissions={{
        isPending: false,
        items: {},
      }}
      userId="666655554444333322221111"
    />,
  );

  test('is rendered as a card component with a form, MediaUploader and a submit button', () => {
    expect(wrapper.find('Card').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('MediaUploader').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(1);
  });
});
