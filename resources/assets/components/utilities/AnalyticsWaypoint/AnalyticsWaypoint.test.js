import React from 'react';
import { mount } from 'enzyme';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import AnalyticsWaypoint from './AnalyticsWaypoint';
import { trackAnalyticsEvent as trackEventMock } from '../../../helpers/analytics';

jest.mock('../../../helpers/analytics');

const waypointName = 'test_component-start';
const blockId = '123';

const getWrapper = () =>
  mount(<AnalyticsWaypoint name={waypointName} context={{ blockId }} />);

describe('The AnalyticsWaypoint component', () => {
  it('renders a div', () => {
    expect(getWrapper().find('div')).toHaveLength(1);
  });

  it('triggers an analytics event with the correct parameters when interesecting with the viewport', () => {
    getWrapper();

    // Mock the element intersection with the viewport.
    mockAllIsIntersecting(true);

    // The analytics event should now have been invoked.
    expect(trackEventMock.mock.calls.length).toBe(1);
    expect(trackEventMock.mock.calls[0]).toEqual([
      {
        context: {
          name: waypointName,
          blockId,
        },
        metadata: {
          verb: 'reached',
          noun: 'waypoint',
          target: 'waypoint',
          category: 'waypoint',
          label: waypointName,
        },
      },
    ]);
  });

  it('only triggers one analytics event, and ignores further viewport intersections', () => {
    getWrapper();

    // Mock the element intersection with the viewport.
    mockAllIsIntersecting(true);
    // Mock leaving the viewport and intersecting once again.
    mockAllIsIntersecting(false);
    mockAllIsIntersecting(true);

    // The analytics event should only have been invoked once.
    expect(trackEventMock.mock.calls.length).toBe(1);
  });
});
