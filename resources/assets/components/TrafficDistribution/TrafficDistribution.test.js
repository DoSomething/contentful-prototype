/* global window */

import React from 'react';
import { shallow } from 'enzyme';

import TrafficDistribution from './TrafficDistribution';
import { get, set } from '../../helpers/storage';
import LocalStorageMock from '../../__mocks__/localStorageMock';

// Before each test, we set a fresh localStorage mock
beforeEach(() => {
  global.localStorage = new LocalStorageMock();
});


// Set some constants for consistent traffic percentage math across the tests.
const percentage = 10;

const withinPool = percentage / 100;

const outsidePool = (percentage / 100) + 1;

// Fake feature name.
const feature = "test_feature";


////// HELPER METHODS:

// Sets up a mock Math object, with a mock random() method for testing.
const setMockMath = (num) => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => num;
  global.Math = mockMath;
}

const setWithinPool = () => (setMockMath(withinPool));
const setOutsidePool = () => (setMockMath(outsidePool));

const shallowComponent = () => (
  shallow(
    <TrafficDistribution percentage={percentage} feature={feature}>
      <p>Hey there ole chap!</p>
    </TrafficDistribution>
  )
);

const testFeatureVisibility = (component) => {
  expect(component.find('p')).toHaveLength(1);
  expect(component.find('p').text()).toEqual('Hey there ole chap!');
};

const getFeatureFromStorage = () => (
  get(`TrafficDistribution_${feature}`, 'object')
);

const setFeatureInStorage = (showFeature) => {
  set(`TrafficDistribution_${feature}`, 'object', {showFeature});
};


////// TESTS:

test('it displays the child component when inside percentage pool', () => {
  setWithinPool();

  testFeatureVisibility(shallowComponent());
});

test('it does not render the child component if outside percentage pool', () => {
  setOutsidePool();

  const component = shallowComponent();

  expect(component.find('p')).toHaveLength(0);
});

test('it persists the status as true when assigned to percentage pool', () => {
  setWithinPool();

  testFeatureVisibility(shallowComponent());

  const featureFromStorage = getFeatureFromStorage();

  expect(featureFromStorage).toBeTruthy();
  expect(featureFromStorage.showFeature).toBe(true);
});

test('it saves the status as false when assigned to percentage pool', () => {
  setOutsidePool();

  const component = shallowComponent();

  expect(component.find('p')).toHaveLength(0);

  const featureFromStorage = getFeatureFromStorage();

  expect(featureFromStorage).toBeTruthy();
  expect(featureFromStorage.showFeature).toBe(false);
});

test('it ignores the math and shows the feature if set to show in localstorage', () => {
  setFeatureInStorage(true);

  setOutsidePool();

  testFeatureVisibility(shallowComponent());
});

test('it ignores the math and does not show the feature if set to not show in localstorage', () => {
  setFeatureInStorage(false);

  setWithinPool();

  const component = shallowComponent();

  expect(component.find('p')).toHaveLength(0);
});
