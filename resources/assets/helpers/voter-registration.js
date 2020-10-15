import gql from 'graphql-tag';

import { getUtms } from './utm';
import { getUserId } from './auth';

/**
 * Query used to fetch user voter registration status
 */
export const USER_VOTER_REGISTRATION_STATUS_QUERY = gql`
  query UserVoterRegistrationStatusQuery($userId: String!) {
    user(id: $userId) {
      id
      voterRegistrationStatus
    }
  }
`;

/**
 * Voter registration statuses for users who shouldn't see voter registration CTAs
 */
export const excludedVoterRegistrationStatuses = [
  'INELIGIBLE',
  'REGISTRATION_COMPLETE',
];

/**
 * Voter registration statuses for users who aren not confirmed by a third party
 */
export const selfReportedVoterRegistrationStatuses = ['CONFIRMED', 'UNCERTAIN'];

/**
 * Returns percentage completed and corresponding label.
 *
 * @param {Number} goalAmount
 * @param {Number} completedAmount
 * @return {Object}
 */
export function getGoalInfo(goalAmount, completedAmount) {
  const goal = goalAmount || 50;
  const percentage = Math.round((completedAmount / goal) * 100);

  return {
    goal,
    percentage,
    description:
      percentage > 100
        ? `🎉 You're at ${percentage}% of your goal! 🎉`
        : `${percentage}% to your goal!`,
  };
}

/**
 * Returns tracking source query value to send for Voter Registration URLs.
 * @see /docs/development/features/voter-registration#tracking-source
 *
 * @param {String} sourceDetails
 * @param {String} referrerUserId
 * @param {Number} groupId
 * @return {String}
 */
export function getTrackingSource(sourceDetails, referrerUserId, groupId) {
  const utms = getUtms();

  // Append UTMs to source_details value if they exist.
  const result = `source:web,source_details:${sourceDetails}${
    utms.utm_source ? `_${utms.utm_source}` : ''
  }${utms.utm_campaign ? `_${utms.utm_campaign}` : ''}${
    groupId ? `,group_id=${groupId}` : ''
  }`;

  if (referrerUserId) {
    return `user:${referrerUserId},${result},referral=true`;
  }

  return getUserId() ? `user:${getUserId()},${result}` : result;
}

/**
 * Returns boolean indicating whether user's registration status is considered "registered"
 *
 * @param {String} userRegistrationStatus
 * @return {Boolean}
 */
export function isRegisteredStatus(userRegistrationStatus) {
  return selfReportedVoterRegistrationStatuses.includes(userRegistrationStatus);
}

/**
 * Checks if given voter registration status matches an entry in excluded status config.
 *
 * @param {String} voterRegistrationStatus
 * @return {Boolean}
 */
export const isExcludedVoterRegistrationStatus = voterRegistrationStatus => {
  return excludedVoterRegistrationStatuses.includes(voterRegistrationStatus);
};

/**
 * Returns Url to use when checking voter registration status
 */
export function getCheckRegistrationStatusURL() {
  return 'https://am-i-registered-to-vote.org/dosomething/';
}
