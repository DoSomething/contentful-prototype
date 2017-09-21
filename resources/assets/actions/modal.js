import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

export function openModal(modalType, blockId) {
  return { type: OPEN_MODAL, modalType, blockId };
}

export function closeModal() {
  return { type: CLOSE_MODAL };
}
