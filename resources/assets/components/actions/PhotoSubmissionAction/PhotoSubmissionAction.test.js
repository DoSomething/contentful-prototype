import React from 'react';
import { shallow } from 'enzyme';

import PhotoSubmissionAction from './PhotoSubmissionAction';

describe('PhotoSubmissionAction component', () => {
  const id = 'abcdefghi123456789';

  const wrapper = shallow(
    <PhotoSubmissionAction
      appendPostSubmissionItem={jest.fn()}
      campaignId="1234"
      campaignRunId="6789"
      clearPostSubmissionItem={jest.fn()}
      id={id}
      storeCampaignPost={jest.fn()}
      submissions={{
        isPending: false,
        items: {},
      }}
    />,
  );

  test('is rendered as a card component with a form, MediaUploader and a submit button', () => {
    expect(wrapper.find('Card').length).toBeGreaterThanOrEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('MediaUploader').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(1);
  });
});
