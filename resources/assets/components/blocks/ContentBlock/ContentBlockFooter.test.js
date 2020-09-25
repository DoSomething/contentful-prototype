import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import '@testing-library/jest-dom/extend-expect';

import ContentBlockFooter from './ContentBlockFooter';

describe('ContentBlockFooter component', () => {
  /** @test */
  test('Renders component when type is valid', () => {
    ['GetOutTheVoteBlock', 'RequestBallotBlock'].forEach(type => {
      const wrapper = shallow(<ContentBlockFooter type={type} />);

      expect(wrapper.find(type).length).toEqual(1);
      expect(wrapper.find('ErrorBlock').length).toEqual(0);
    });
  });

  /** @test */
  test('Renders ErrorBlock if invalid type', () => {
    const wrapper = shallow(<ContentBlockFooter type="PuppetSlothBlock" />);

    expect(wrapper.find('ErrorBlock').length).toEqual(1);
  });
});
