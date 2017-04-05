import { transformState } from '../helpers/analytics';
import { analyze } from '@dosomething/analytics';

// Action: Track a custom event
export function trackEvent(collection, metadata) {
  return (dispatch, getState) => {
    const state = transformState(collection, getState());

    analyze(collection, {
      metadata,
      state,
    });
  }
}
