/* global document */
/* eslint-disable import/prefer-default-export */

import { toggleHandler } from '../helpers';

export function bindFlashMessageEvents() {
  const flashMessage = document.getElementById('flash-message');
  const flashMessageClose = document.getElementById('js-flash-message-close');

  if (flashMessage) {
    toggleHandler(flashMessageClose, flashMessage, 'is-visible');
  }
}
