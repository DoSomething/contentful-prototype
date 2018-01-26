/* global window */

import React from 'react';
import { mount } from 'enzyme';
import { getTime } from 'date-fns';

import Survey from './Survey';
import { set } from '../../helpers/storage';

// Faking timers to be able to interact with and mock our timed survey component
jest.useFakeTimers();

// Mocking local storage for tests
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }
}

// Setting random userId for all test
const userId = '1234';

const mountModal = () => {
  // Using a function mock for the openModal prop
  const openModalMock = jest.fn();

  mount(<Survey userId={userId} openModal={openModalMock} />);

  return openModalMock;
};

// Before each test, we'll toggle the env survey enabled prop, and set a fresh localStorage mock
beforeEach(() => {
  global.ENV = {
    SURVEY_ENABLED: true,
  };

  global.localStorage = new LocalStorageMock();
});

// Helper to set the user survey completion status in localstorage
const toggleUserCompletion = (value) => {
  set(`${userId}_finished_survey`, 'boolean', value);
};

test('it launches the survey when `ENV`s `SURVEY_ENABLED` is toggled on', () => {
  const openModalMock = mountModal();

  jest.runAllTimers();

  expect(openModalMock).toHaveBeenCalledTimes(1);
});

test('it does not launch the survey when `ENV`s `SURVEY_ENABLED` is toggled off', () => {
  global.ENV.SURVEY_ENABLED = false;

  const openModalMock = mountModal();

  jest.runAllTimers();

  expect(openModalMock).toHaveBeenCalledTimes(0);
});

test('it waits 60 seconds to launch survey', () => {
  const openModalMock = mountModal();

  jest.runTimersToTime(59000);

  expect(openModalMock).toHaveBeenCalledTimes(0);

  jest.runTimersToTime(2000);

  expect(openModalMock).toHaveBeenCalledTimes(1);
});

test('it does not launch the survey when there is no userId', () => {
  const openModalMock = jest.fn();

  mount(<Survey openModal={openModalMock} />);

  jest.runAllTimers();

  expect(openModalMock).toHaveBeenCalledTimes(0);
});

test('it does not launch the survey when the user is marked as finished', () => {
  toggleUserCompletion(true);

  const openModalMock = mountModal();

  jest.runAllTimers();

  expect(openModalMock).toHaveBeenCalledTimes(0);
});


test('it marks the user as finished (and does not launch the survey) if the URL params indicate as such', () => {
  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: '?finished_nps=1',
  });

  const openModalMock = mountModal();

  jest.runAllTimers();

  expect(openModalMock).toHaveBeenCalledTimes(0);

  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: '',
  });
});

test('it does not launch the survey is the user is marked as dismissed less then 30 days ago', () => {
  set(`${userId}_dismissed_survey`, 'timestamp', Date.now());

  const openModalMock = mountModal();

  jest.runAllTimers();

  expect(openModalMock).toHaveBeenCalledTimes(0);
});

test('it launches the survey is the user is marked as dismissed more then 30 days ago', () => {
  const time = getTime(Date.now()) - (31 * 1440 * 60 * 1000);

  set(`${userId}_dismissed_survey`, 'timestamp', time);

  const openModalMock = mountModal();

  jest.runAllTimers();

  expect(openModalMock).toHaveBeenCalledTimes(1);
});

