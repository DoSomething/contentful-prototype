import { SHOW_LANDING_PAGE, SHOW_ACTION_PAGE } from '../actions';

const admin = (state = {}, action) => {
  switch (action.type) {
    case SHOW_LANDING_PAGE:
      return {
        ...state,
        shouldShowLandingPage: true,
        shouldShowActionPage: false,
      };

    case SHOW_ACTION_PAGE:
      return {
        ...state,
        shouldShowActionPage: true,
        shouldShowLandingPage: false,
      };

    default:
      return state;
  }
};

export default admin;
