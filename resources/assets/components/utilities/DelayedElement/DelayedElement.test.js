import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import DelayedElement from './DelayedElement';

// https://jestjs.io/docs/en/timer-mocks
jest.useFakeTimers();

const DELAY = 60;

describe('The DelayedElement component', () => {
  it("does not display it's children for the assigned delay time - in seconds", () => {
    // @TODO we can use a 'shallow' test once support for React Hooks is released.
    // https://github.com/airbnb/enzyme/issues/2011
    const wrapper = mount(
      <DelayedElement delay={DELAY}>
        <div id="element" />
      </DelayedElement>,
    );

    // The element should not appear.
    expect(wrapper.find('#element')).toHaveLength(0);

    // Run timers to one second less than the delay.
    act(() => jest.runTimersToTime((DELAY - 1) * 1000));
    // The element should still not appear.
    expect(wrapper.update().find('#element')).toHaveLength(0);

    // Finally, run timers to one second past the delay.
    act(() => jest.runTimersToTime(2000));
    // The element should now appear!
    expect(wrapper.update().find('#element')).toHaveLength(1);
  });
});
