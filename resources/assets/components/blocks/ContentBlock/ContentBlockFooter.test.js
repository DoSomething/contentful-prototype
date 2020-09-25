import React from 'react';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';

import ContentBlockFooter from './ContentBlockFooter';

describe('ContentBlockFooter component', () => {
  /** @test */
  test('renders component when type is valid', () => {
    ['GetOutTheVoteBlock', 'RequestBallotBlock'].forEach(type => {
      const wrapper = shallow(<ContentBlockFooter type={type} />);

      expect(wrapper.find(type).length).toEqual(1);
      expect(wrapper.find('ErrorBlock').length).toEqual(0);
    });
  });

  /** @test */
  test('renders ErrorBlock if invalid type', () => {
    const wrapper = shallow(<ContentBlockFooter type="PuppetSlothBlock" />);

    expect(wrapper.find('ErrorBlock').length).toEqual(1);
    expect(wrapper.find('GetOutTheVoteBlock').length).toEqual(0);
    expect(wrapper.find('RequestBallotBlock').length).toEqual(0);
  });
});
