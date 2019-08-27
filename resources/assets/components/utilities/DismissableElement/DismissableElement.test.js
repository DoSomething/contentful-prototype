/* global jsdom */
import React from 'react';
import { mount } from 'enzyme';
import { getTime } from 'date-fns';

import { get, set } from '../../../helpers/storage';
import DismissableElement from './DismissableElement';
import LocalStorageMock from '../../../__mocks__/localStorageMock';

// Name for our dismissable element.
const NAME = 'fun_survey';

const getWrapper = () =>
  mount(
    <DismissableElement
      name={NAME}
      render={handleClose => <button id="element" onClick={handleClose} />}
    />,
  );

// Mock localStorage for testing.
global.localStorage = new LocalStorageMock();

describe('The DismissableElement component', () => {
  // Before each test, clear localStorage.
  beforeEach(() => global.localStorage.clear());

  it('renders the element by default', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('#element')).toHaveLength(1);
  });

  it('does not render the element when it is marked as "hidden" in localStorage', () => {
    // Mark the element as "hidden" in localStorage.
    set(`hide_${NAME}`, 'boolean', true);

    const wrapper = getWrapper();

    expect(wrapper.find('#element')).toHaveLength(0);
  });

  it('marks the element as "hidden" (and does not render it) based on the URL query parameter', () => {
    // Mock a URL with the query parameter indicating to mark the element as "hidden".
    jsdom.reconfigure({
      url: `https://phoenix.test?hide_${NAME}=1`,
    });

    const wrapper = getWrapper();

    expect(wrapper.find('#element')).toHaveLength(0);

    // Reset the URL.
    jsdom.reconfigure({
      url: 'https://phoenix.test',
    });
  });

  it('does not render the element if the user is marked as "dismissed" in localStorage less then 30 days ago', () => {
    set(`dismissed_${NAME}`, 'timestamp', Date.now());

    const wrapper = getWrapper();

    expect(wrapper.find('#element')).toHaveLength(0);
  });

  it('renders the element if marked as "dismissed" more then 30 days ago', () => {
    // 31 days ago in milliseconds.
    const time = getTime(Date.now()) - 31 * 1440 * 60 * 1000;

    set(`dismissed_${NAME}`, 'timestamp', time);

    const wrapper = getWrapper();

    expect(wrapper.find('#element')).toHaveLength(1);
  });

  it('hides the element once it\'s dismissed, and marks as "dismissed" in localStorage', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('#element')).toHaveLength(1);

    // Mock Date.now so we can test that the proper timestamp is saved in localStorage upon dismissal.
    const mockedTime = Date.now();
    Date.now = jest.spyOn(Date, 'now').mockImplementation(() => mockedTime);

    // Click on the button to "dismiss" the element by invoking the dismissal callback function (handleClose).
    wrapper.find('#element').simulate('click');

    // The element should be hidden!
    expect(wrapper.find('#element')).toHaveLength(0);

    // We should have saved the
    expect(get(`dismissed_${NAME}`, 'timestamp')).toEqual(mockedTime);
  });
});
