import { OPEN_MODAL, CLOSE_MODAL } from '../actions';
import { toggleChromeLock } from '../helpers';

export function openModal(modalType, contentfulId) {
  toggleChromeLock();
  return { type: OPEN_MODAL, modalType, contentfulId };
}

export function closeModal() {
  toggleChromeLock();
  return { type: CLOSE_MODAL };
}
