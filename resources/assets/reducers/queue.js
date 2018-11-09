/* global window */

import { has } from 'lodash';
import localforage from 'localforage';

import { QUEUE_ADD_ITEM, QUEUE_REMOVE_ITEM } from '../constants/action-types';

/**
 * Queue reducer.
 */
const queue = (state = {}, action) => {
  const payload = action.payload;

  if (action.key && !has(state, action.key)) {
    state[action.key] = [];
  }

  switch (action.type) {
    case QUEUE_ADD_ITEM:
      console.log('💁🏻‍♂️', action);

      if (action.key === 'postAuthActions') {
        localforage.setItem(`queue:${action.key}`, payload).then(() => {
          // window.location.href = payload.meta.redirectUrl;
          console.log('💫 go to Northstar login...');
        });

        // return state;
      }

      return { ...state, [action.key]: payload };

    case QUEUE_REMOVE_ITEM:
      console.log('💁🏻‍♂️', action);

      if (action.key === 'postAuthActions') {
        localforage.getItem(`queue:${action.key}`).then(value => {
          console.log('🎉', value);
        });
      }

      return state;

    default:
      return state;
  }
};

export default queue;
