import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ReportbackItem from './ReportbackItem';

test('Reportback Item basic snapshot test', () => {
  const component = shallow(<ReportbackItem />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Reportback Item snapshot test', () => {
  const component = shallow(
    <ReportbackItem
      id="09251952"
      caption="Some awesmome caption"
      firstName="Luke Skywalker"
      noun={{ singular: 'lightsaber', plural: 'lightsabers' }}
      quantity={20}
      url="https://static1.comicvine.com/uploads/original/11118/111184078/5124660-6531264806-22292.jpg"
      reaction={{ id: '456', reacted: true, termId: '789', total: 30 }}
    />,
  );
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
