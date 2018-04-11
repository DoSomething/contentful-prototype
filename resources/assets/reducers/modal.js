import { OPEN_MODAL, CLOSE_MODAL } from '../actions';

const modal = (state = {}, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        shouldShowModal: true,
        modalType: action.modalType,
        contentfulId: action.contentfulId,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        shouldShowModal: false,
        modalType: null,
        contentfulId: null,
      };

    default:
      return state;
  }
};

export default modal;
