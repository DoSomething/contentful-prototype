import { getUserId } from './auth';

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
  const result = `source:web,source_details:${sourceDetails}${
    groupId ? `,group_id=${groupId}` : ''
  }`;

  if (referrerUserId) {
    return `user:${referrerUserId},${result},referral=true`;
  }

  return getUserId() ? `user:${getUserId()},${result}` : result;
}
