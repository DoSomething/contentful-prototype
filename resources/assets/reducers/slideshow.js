import { NEXT_SLIDE } from '../actions';

const slideshowReducer = (state = {}, action) => {
  switch (action.type) {
    case NEXT_SLIDE: {
      const { slideshowId } = action;

      return {
        ...state,
        [slideshowId]: slideshowId in state ? state[slideshowId] + 1 : 0,
      };
    }

    default:
      return state;
  }
};

export default slideshowReducer;
