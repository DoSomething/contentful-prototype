import { QUEUE_ADD_ITEM, QUEUE_REMOVE_ITEM } from '../constants/action-types';

export function addToQueue(key = 'default', payload) {
  return {
    type: QUEUE_ADD_ITEM,
    key,
    payload,
  };
}

export function removeFromQueue(key = 'default') {
  return {
    type: QUEUE_REMOVE_ITEM,
    key,
  };
}
