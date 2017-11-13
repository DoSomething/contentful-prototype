import { SHOW_LANDING_PAGE } from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: show the campaigns landing page
export default function clickedShowLandingPage() {
  return { type: SHOW_LANDING_PAGE };
}
