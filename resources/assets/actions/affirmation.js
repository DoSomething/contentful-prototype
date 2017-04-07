import {
  AFFIRMATION_OPEN,
  AFFIRMATION_CLOSE,
  queueUserEvent,
} from '../actions';

// Action: Open the affirmation component.
export function openAffirmation() {
  return (dispatch, getState) => {
    const userId = getState().user.id;

    dispatch({
      type: AFFIRMATION_OPEN,
      userId,
    });

    dispatch(queueUserEvent('closeAffirmation'))
  }
}

// Action: Close the affirmation component.
export function closeAffirmation() {
  return (dispatch, getState) => {
    dispatch({
      type: AFFIRMATION_CLOSE,
      userId: getState().user.id,
    });
  }
}
