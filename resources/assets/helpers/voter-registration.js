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

export { getGoalInfo as default };
