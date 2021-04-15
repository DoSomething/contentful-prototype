import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import AnalyticsWaypoint from './AnalyticsWaypoint';
import { trackAnalyticsEvent } from '../../../helpers/analytics';

jest.mock('../../../helpers/analytics');

const waypointName = 'test_component-start';
const blockId = '123';
const url = window.location.href;

const renderAnalyticsWaypoint = () =>
  render(<AnalyticsWaypoint name={waypointName} context={{ blockId }} />);

describe('The AnalyticsWaypoint component', () => {
  it('renders a div', async () => {
    renderAnalyticsWaypoint();

    expect(screen.getByTestId('waypoint')).toBeTruthy();
  });

  it('triggers an analytics event with the correct parameters when interesecting with the viewport', () => {
    renderAnalyticsWaypoint();

    // Mock the element intersection with the viewport.
    mockAllIsIntersecting(true);

    // The analytics event should now have been invoked.
    expect(trackAnalyticsEvent.mock.calls.length).toBe(1);
    expect(trackAnalyticsEvent.mock.calls[0]).toEqual([
      'reached_waypoint',
      {
        action: 'waypoint_reached',
        category: 'waypoint',
        label: waypointName,
        context: {
          name: waypointName,
          blockId,
          url,
        },
      },
    ]);
  });

  it('only triggers one analytics event, and ignores further viewport intersections', () => {
    renderAnalyticsWaypoint();

    // Mock the element intersection with the viewport.
    mockAllIsIntersecting(true);
    // Mock leaving the viewport and intersecting once again.
    mockAllIsIntersecting(false);
    mockAllIsIntersecting(true);

    // The analytics event should only have been invoked once.
    expect(trackAnalyticsEvent.mock.calls.length).toBe(1);
  });
});
