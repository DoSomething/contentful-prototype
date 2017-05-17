/* eslint import/prefer-default-export: "off" */
import { analyze } from '@dosomething/analytics';
import { APPLICATION_INIT } from './';
import { transformState } from '../helpers/analytics';

export function appInit() {
  return { type: APPLICATION_INIT };
}

// Action: Track a custom event
export function trackEvent(collection, metadata) {
  return (dispatch, getState) => {
    const appState = getState();

    // Don't track admins on production!
    if (appState.user.role === 'admin' && process.env.NODE_ENV === 'production') {
      return;
    }

    const transformedState = transformState(collection, appState);

    analyze(collection, {
      metadata,
      transformedState,
    });
  };
}
