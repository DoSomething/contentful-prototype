/* global jsdom */

import React from 'react';
import { shallow } from 'enzyme';
import { getTime } from 'date-fns';

import { set } from '../../helpers/storage';
import LocalStorageMock from '../../__mocks__/localStorageMock';

import ModalLauncher from './ModalLauncher';

// Faking timers to be able to interact with and mock our timed modal launcher component
jest.useFakeTimers();

const userId = '1234';
const type = 'fun_survey';
const MODAL_COUNTDOWN = 60;

const getShallow = (isAuthenticated = true) =>
  shallow(
    <ModalLauncher
      type={type}
      countdown={MODAL_COUNTDOWN}
      render={() => <div className="my-modal" />}
      userId={userId}
      isAuthenticated={isAuthenticated}
    />,
  );

// Helper to set the user survey completion status in localstorage
const toggleHideModal = value => {
  set(`${userId}_hide_${type}`, 'boolean', value);
};

describe('The ModalLauncher component', () => {
  // Before each test, we'll toggle the env survey enabled prop, and set a fresh localStorage mock
  beforeEach(() => {
    global.ENV = {
      FUN_SURVEY_ENABLED: true,
    };

    global.localStorage = new LocalStorageMock();
  });

  it('waits the alotted countdown time to launch modal', () => {
    const wrapper = getShallow();

    jest.runTimersToTime((MODAL_COUNTDOWN - 1) * 1000);

    expect(wrapper.update().find('Modal')).toHaveLength(0);

    jest.runTimersToTime(2000);

    expect(wrapper.update().find('Modal')).toHaveLength(1);
  });

  it('opens the correct modal type', () => {
    const wrapper = getShallow();
    jest.runAllTimers();

    expect(wrapper.update().find('Modal')).toHaveLength(1);
    // expect(openModalMock.mock.calls[0][0]).toBe(MODAL_TYPE);
  });

  it('launches the modal when `ENV`s `[type]_ENABLED` is toggled on', () => {
    const wrapper = getShallow();
    jest.runAllTimers();

    expect(wrapper.update().find('Modal')).toHaveLength(1);
  });

  it('does not launch the modal when `ENV`s `[type]_ENABLED` is toggled off', () => {
    global.ENV.FUN_SURVEY_ENABLED = false;

    const wrapper = getShallow();
    jest.runAllTimers();

    expect(wrapper.update().find('Modal')).toHaveLength(0);
  });

  it('does not launch when there is no userId', () => {
    const wrapper = getShallow(false);
    jest.runAllTimers();

    expect(wrapper.update().find('Modal')).toHaveLength(0);
  });

  it('does not launch when the feature is marked to be hidden', () => {
    toggleHideModal(true);

    const wrapper = getShallow();
    jest.runAllTimers();

    expect(wrapper.update().find('Modal')).toHaveLength(0);
  });

  it('marks the modal to be hidden (and does not render the modal) if the URL params indicate as such', () => {
    jsdom.reconfigure({
      url: 'https://phoenix.test/?hide_fun_survey=1',
    });

    const wrapper = getShallow();
    jest.runAllTimers();

    expect(wrapper.update().find('Modal')).toHaveLength(0);

    jsdom.reconfigure({
      url: 'https://phoenix.test',
    });
  });

  it('does not launch if the user is marked as dismissed less then 30 days ago', () => {
    set(`${userId}_dismissed_fun_survey`, 'timestamp', Date.now());

    const wrapper = getShallow();
    jest.runAllTimers();

    expect(wrapper.update().find('Modal')).toHaveLength(0);
  });

  it('launches the modal if the user is marked as dismissed more then 30 days ago', () => {
    const time = getTime(Date.now()) - 31 * 1440 * 60 * 1000;

    set(`${userId}_dismissed_fun_survey`, 'timestamp', time);

    const wrapper = getShallow();
    jest.runAllTimers();

    expect(wrapper.update().find('Modal')).toHaveLength(1);
  });
});
