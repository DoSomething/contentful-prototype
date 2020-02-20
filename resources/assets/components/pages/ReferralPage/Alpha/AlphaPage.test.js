import React from 'react';
import { shallow } from 'enzyme';

import AlphaPage from './AlphaPage';
import * as helpers from '../../../../helpers';

describe('AlphaPage component', () => {
  const userId = '55767606a59dbf3c7a8b4571';

  test('is rendered as an ErrorPage if campaign_id query is not present', () => {
    const wrapper = shallow(<AlphaPage userId={userId} />);

    expect(wrapper.find('ErrorPage').length).toEqual(1);
  });

  test('is rendered with a main.alpha-referral-page if campaign_id query is present', () => {
    helpers.getReferralCampaignId = jest.fn().mockReturnValue(23);

    const wrapper = shallow(<AlphaPage userId={userId} />);

    expect(wrapper.find('main.alpha-referral-page').length).toEqual(1);
  });
});
