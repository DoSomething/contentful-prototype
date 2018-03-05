/* global window */

import React from 'react';
import { mount } from 'enzyme';
import { getTime } from 'date-fns';

import ModalLauncher from './ModalLauncher';
import { set } from '../../helpers/storage';
import LocalStorageMock from '../../__mocks__/localStorageMock';

// Faking timers to be able to interact with and mock our timed modal launcher component
jest.useFakeTimers();

const MODAL_COUNTDOWN = 60;
const MODAL_TYPE = 'AWESOME_MODAL'

const mountModal = () => {
  // Using a function mock for the openModal prop
  const openModalMock = jest.fn();

  mount(<ModalLauncher openModal={openModalMock} countdown={MODAL_COUNTDOWN} modalType={MODAL_TYPE} />);

  return openModalMock;
};

describe('The ModalLauncher component', () => {
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
});
