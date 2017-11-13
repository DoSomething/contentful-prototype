import { SHOW_LANDING_PAGE } from '../actions';

const admin = (state = {}, action) => {
  switch (action.type) {
    case SHOW_LANDING_PAGE: return {
      ...state,
      shouldShowLandingPage: true,
    };

    default: return state;
  }
};

export default admin;
