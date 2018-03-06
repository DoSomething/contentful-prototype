/* global window */

import React from 'react';
import { mount } from 'enzyme';
import { getTime } from 'date-fns';

import { set } from '../../helpers/storage';
import LocalStorageMock from '../../__mocks__/localStorageMock';

import ModalLauncher from './ModalLauncher';

// Faking timers to be able to interact with and mock our timed modal launcher component
jest.useFakeTimers();

const userId = '1234';
const type = 'fun_survey';
const MODAL_COUNTDOWN = 60;
const MODAL_TYPE = 'AWESOME_MODAL';


const mountModal = (isAuthenticated = true) => {
  // Using a function mock for the openModal prop
  const openModalMock = jest.fn();

  mount(
    <ModalLauncher
      type={type}
      countdown={MODAL_COUNTDOWN}
      modalType={MODAL_TYPE}
      userId={userId}
      isAuthenticated={isAuthenticated}
      openModal={openModalMock}
    />,
  );

  return openModalMock;
};

// Helper to set the user survey completion status in localstorage
const toggleHideModal = (value) => {
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
    const openModalMock = mountModal();

    jest.runTimersToTime((MODAL_COUNTDOWN - 1) * 1000);

    expect(openModalMock).toHaveBeenCalledTimes(0);

    jest.runTimersToTime(2000);

    expect(openModalMock).toHaveBeenCalledTimes(1);
  });

  it('opens the correct modal type', () => {
    const openModalMock = mountModal();

    jest.runAllTimers();

    expect(openModalMock.mock.calls[0][0]).toBe(MODAL_TYPE);
  });

  it('launches the modal when `ENV`s `[type]_ENABLED` is toggled on', () => {
    const openModalMock = mountModal();

    jest.runAllTimers();

    expect(openModalMock).toHaveBeenCalledTimes(1);
  });

  it('does not launch the modal when `ENV`s `[type]_ENABLED` is toggled off', () => {
    global.ENV.SURVEY_ENABLED = false;

    const openModalMock = mountModal();

    expect(openModalMock).toHaveBeenCalledTimes(0);
  });

  it('does not launch when there is no userId', () => {
    const openModalMock = mountModal(false);

    expect(openModalMock).toHaveBeenCalledTimes(0);
  });

  it('does not launch when the feature is marked to be hidden', () => {
    toggleHideModal(true);

    const openModalMock = mountModal();

    expect(openModalMock).toHaveBeenCalledTimes(0);
  });


  it('marks the modal to be hidden (and does not render the modal) if the URL params indicate as such', () => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?hide_fun_survey=1',
    });

    const openModalMock = mountModal();

    expect(openModalMock).toHaveBeenCalledTimes(0);

    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '',
    });
  });

  it('does not launch if the user is marked as dismissed less then 30 days ago', () => {
    set(`${userId}_dismissed_fun_survey`, 'timestamp', Date.now());

    const openModalMock = mountModal();

    expect(openModalMock).toHaveBeenCalledTimes(0);
  });

  it('launches the modal if the user is marked as dismissed more then 30 days ago', () => {
    const time = getTime(Date.now()) - (31 * 1440 * 60 * 1000);

    set(`${userId}_dismissed_fun_survey`, 'timestamp', time);

    const openModalMock = mountModal();

    expect(openModalMock).toHaveBeenCalledTimes(0);
  });
});
