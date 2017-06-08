import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const modal = (state = {}, action) => {
  switch (action.type) {
    case OPEN_MODAL: return { ...state, shouldShowModal: true };
    case CLOSE_MODAL: return { ...state, shouldShowModal: false };
    default: return state;
  }
};

export default modal;
