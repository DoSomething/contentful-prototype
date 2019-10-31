/**
 * Prepare a campaign's action info.
 *
 * @param  {Array} actionsArray
 * @param  {String} keyName
 * @return {String}
 */

export default function defineCampaignActionInfo(actionsArray, keyName) {
  return actionsArray.length ? actionsArray[0][keyName] : null;
}
