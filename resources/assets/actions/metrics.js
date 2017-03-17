/*
 * Action names: import these constants to dispatch an event
 * without having hardcoded strings all about.
 */
export const POST_EVENT = 'POST_EVENT';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

 // Async Action: post the given data to the collection
 export function postEvent(collection, data) {
   return dispatch => (new Phoenix).get(`activity/${campaignId}`)
     .then(response => {
       if (!response || !response.sid) return;

       dispatch(signupComplete(campaignId));
       dispatch(setCurrentlySignedUp(true));
     });
 }
