/* global document */
/* eslint-disable import/prefer-default-export */

import { toggleClassHandler } from '.';

export function bindFlashMessageEvents() {
  const flashMessage = document.getElementById('flash-message');
  const flashMessageClose = document.getElementById('js-flash-message-close');

  if (flashMessage) {
    toggleClassHandler(flashMessageClose, flashMessage, 'is-visible');
  }
}
