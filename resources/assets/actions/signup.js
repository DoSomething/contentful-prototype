/* global window */

import { join } from 'path';
import { push } from 'react-router-redux';
import { Phoenix } from '@dosomething/gateway';

import apiRequest from './api';
import { isCampaignClosed } from '../helpers';
import { isCampaignSignUpInState } from '../selectors/signup';
import { getUserId, isAuthenticated } from '../selectors/user';
import { addToCachedQueue } from '../actions/queue';
import {
  SIGNUP_CREATED,
  SIGNUP_PENDING,
  SIGNUP_CLICKED_OPT_OUT,
  OPENED_POST_SIGNUP_MODAL,
  CLOSED_POST_SIGNUP_MODAL,
  CLICKED_REMOVE_SIGN_UP,
  queueEvent,
  addNotification,
} from '../actions';
import {
  GET_CAMPAIGN_SIGNUPS_FAILED,
  GET_CAMPAIGN_SIGNUPS_PENDING,
  GET_CAMPAIGN_SIGNUPS_SUCCESSFUL,
} from '../constants/action-types';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: no existing signup was found for the campaign.
export function clickedHideAffirmation() {
  return { type: CLOSED_POST_SIGNUP_MODAL };
}

export function convertOnSignupAction() {
  return {
    type: 'CLICKED_SIGNUP_BUTTON',
    payload: {
      meta: {
        sixpackExperiments: {
          conversion: 'signup',
        },
      },
    },
  };
}

// Action: triggers the post signup affirmation modal.
// This is for admin usage.
export function clickedShowAffirmation() {
  return { type: OPENED_POST_SIGNUP_MODAL };
}

// Action: sends whether the user opted out of affiliate messaging.
export function clickedOptOut() {
  return { type: SIGNUP_CLICKED_OPT_OUT };
}

// Action: removes the current signup from campaign
// for admin to preview content
export function clickedRemoveSignUp(campaignId) {
  return { type: CLICKED_REMOVE_SIGN_UP, campaignId };
}

// Action: a new signup was created for a campaign.
export function signupCreated(campaignId, shouldShowAffirmation = true) {
  return (dispatch, getState) => {
    const { user } = getState();

    dispatch({
      type: SIGNUP_CREATED,
      campaignId,
      userId: user.id,
      shouldShowAffirmation,
    });
  };
}

// Action: waiting on a signup response.
// @TODO: cleanup the signup actions to use approach established in "post" action.
export function signupPending() {
  return { type: SIGNUP_PENDING };
}

/**
 * Get signups for a campaign; allows filtering via query options.
 *
 * @param  {Object} query
 * @param  {String} id
 * @return {Function}
 */
export function getCampaignSignups(id = null, query = {}) {
  return (dispatch, getState) => {
    const state = getState();
    const campaignId = id || state.campaign.campaignId;

    dispatch(
      apiRequest('GET', {
        campaignId,
        failure: GET_CAMPAIGN_SIGNUPS_FAILED,
        meta: {
          northstarId: getUserId(state),
        },
        pending: GET_CAMPAIGN_SIGNUPS_PENDING,
        query,
        success: GET_CAMPAIGN_SIGNUPS_SUCCESSFUL,
        url: `${window.location.origin}/api/v2/campaigns/${campaignId}/signups`,
      }),
    );
  };
}

/**
 * [storeCampaignSignup description]
 * @param  {String} campaignId
 * @param  {Object} data
 * @return {Function}
 */
export function storeCampaignSignup(campaignId, data) {
  // if no id or data let's throw an error!

  const analytics = {
    name: 'phoenix_clicked_signup',
    service: 'puck',
    payload: {
      campaignId,
    },
  };

  return (dispatch, getState) => {
    console.log('💀');

    dispatch(
      apiRequest('POST', {
        body: {},
        failure: 'failure_message',
        meta: {
          analytics,
          sixpackExperiments: { conversion: 'signup' },
        },
        pending: 'pending_message',
        requiresAuthentication: true,
        success: 'success_message',
        url: `${window.location.origin}/api/v2/campaigns/${campaignId}/signups`,
      }),
    );
  };
}

/**
 * [clickedSignupAction description]
 *
 * @param  {Object} options
 * @param  {String} options.campaignId
 * @param  {String} options.slug
 * @return {String|Function}
 */
export function clickedSignupAction(options = {}) {
  console.log('👻');

  return (dispatch, getState) => {
    const state = getState();
    const slug = options.slug || state.campaign.slug;
    const campaignId = options.campaignId || state.campaign.campaignId;

    const details = {}; // @TODO: get details

    // Convert Sixpack Experiments on signup action clicks.
    dispatch(convertOnSignupAction());

    // // Queue signup action if user is not logged in.
    // if (!isAuthenticated(state)) {
    //   console.log('🚷');

    //   return dispatch(
    //     addToCachedQueue('postAuthActions', {
    //       action: {
    //         name: 'storeCampaignSignup',
    //         args: [campaignId, { details }],
    //       },
    //       meta: {
    //         redirectUrl: buildCampaignLoginRedirectUrl(
    //           getCampaignDataForNorthstar(state),
    //         ),
    //       },
    //     }),
    //   );
    // }

    // // If signup already exists in state store (after authentication is confirmed) head to campaign action page; still necessary?
    // if (isCampaignSignUpInState(state, campaignId)) {
    //   return join(`/us/campaigns/${state.campaign.slug}/action`);
    // }

    // dispatch({
    //   ...storeCampaignSignup(campaignId, { details }),
    //   requireAuthentication: true,
    // });

    dispatch(storeCampaignSignup(campaignId, { details }));
  };
}

// Async Action: send signup to phoenix and
// check if the user is logged in or has an existing signup.
export function clickedSignUp(
  campaignId,
  options = null,
  shouldRedirectToActionTab = true,
) {
  return (dispatch, getState) => {
    const state = getState();
    const campaignActionUrl = join(
      '/us/campaigns',
      getState().campaign.slug,
      '/action',
    );

    // get campagin run id from state.
    const campaignRunId = state.campaign.legacyCampaignRunId;

    // If we show an affiliate option, send the value over to Rogue as details
    let details = options;

    const additionalContent = state.campaign.additionalContent || {};
    if (additionalContent.displayAffilitateOptOut && !details) {
      details = state.signups.affiliateMessagingOptOut
        ? 'affiliate-opt-out'
        : null;
    }

    // @TODO: Once we refactor this file, hopefully will not need this action
    // dispatch any longer, or flow will be more logical!
    dispatch(convertOnSignupAction());

    // If the user is not logged in, handle this action later.
    if (!isAuthenticated(state)) {
      return dispatch(
        queueEvent(
          'clickedSignUp',
          campaignId,
          details,
          shouldRedirectToActionTab,
        ),
      );
    }

    // If we already have a signup, just go to the action page.
    if (state.signups.data.includes(campaignId)) {
      return shouldRedirectToActionTab
        ? dispatch(push(campaignActionUrl))
        : null;
    }

    dispatch(signupPending());

    return new Phoenix()
      .post('next/signups', { campaignId, campaignRunId, details })
      .then(response => {
        // Handle a bad signup response...
        if (!response) {
          dispatch(addNotification('error'));
        } else if (response[0] === false) {
          // If Drupal denied our signup request, check if we already had a signup.
          dispatch(
            getCampaignSignups(campaignId, {
              filter: { northstar_id: getUserId(state) },
            }),
          );
        } else {
          const isClosed = isCampaignClosed(state.campaign.endDate);

          // Create signup and track any data before redirects.
          dispatch(
            signupCreated(campaignId, shouldRedirectToActionTab && !isClosed),
          );

          // Take user to the action page if campaign is open.
          if (shouldRedirectToActionTab && !isClosed) {
            dispatch({ type: OPENED_POST_SIGNUP_MODAL });
            dispatch(push(campaignActionUrl));
          }
        }
      });
  };
}
