import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

export function openModal(modalType, contentfulId) {
  return { type: OPEN_MODAL, modalType, contentfulId };
}

export function closeModal() {
  return { type: CLOSE_MODAL };
}
