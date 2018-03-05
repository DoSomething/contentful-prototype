/* global window */

import React from 'react';
import { shallow } from 'enzyme';
import { getTime } from 'date-fns';

import Survey from './Survey';
import { set } from '../../helpers/storage';
import LocalStorageMock from '../../__mocks__/localStorageMock';

// Setting random userId for all tests
const userId = '1234';

const getShallow = () => (
  shallow(<Survey userId={userId} />)
);

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

test('it renders the modalLauncher when `ENV`s `SURVEY_ENABLED` is toggled on', () => {
  const wrapper = getShallow();

  expect(wrapper.find('Connect(ModalLauncher)')).toHaveLength(1);
});

test('it does not render the modalLauncher when `ENV`s `SURVEY_ENABLED` is toggled off', () => {
  global.ENV.SURVEY_ENABLED = false;

  const wrapper = getShallow();

  expect(wrapper.find('Connect(ModalLauncher)')).toHaveLength(0);
});

test('it does not render the modalLauncher when there is no userId', () => {
  const wrapper = shallow(<Survey />);

  expect(wrapper.find('Connect(ModalLauncher)')).toHaveLength(0);
});

test('it does not render the modalLauncher when the user is marked as finished', () => {
  toggleUserCompletion(true);

  const wrapper = getShallow();

  expect(wrapper.find('Connect(ModalLauncher)')).toHaveLength(0);
});


test('it marks the user as finished (and does not render the modalLauncher) if the URL params indicate as such', () => {
  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: '?finished_nps=1',
  });

  const wrapper = getShallow();

  expect(wrapper.find('Connect(ModalLauncher)')).toHaveLength(0);

  Object.defineProperty(window.location, 'search', {
    writable: true,
    value: '',
  });
});

test('it does not render the modalLauncher if the user is marked as dismissed less then 30 days ago', () => {
  set(`${userId}_dismissed_survey`, 'timestamp', Date.now());

  const wrapper = getShallow();

  expect(wrapper.find('Connect(ModalLauncher)')).toHaveLength(0);
});

test('it renders the modalLauncher if the user is marked as dismissed more then 30 days ago', () => {
  const time = getTime(Date.now()) - (31 * 1440 * 60 * 1000);

  set(`${userId}_dismissed_survey`, 'timestamp', time);

  const wrapper = getShallow();

  expect(wrapper.find('Connect(ModalLauncher)')).toHaveLength(1);
});

