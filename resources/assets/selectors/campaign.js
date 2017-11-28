/* eslint-disable import/prefer-default-export */

import { get } from 'lodash';

/**
 * Get the campaign lead on a campaign. Prefer the field
 * but handle legacy json.
 */
export function getCampaignLead(state) {
  const campaignLead = get(state.campaign, 'campaignLead');
  if (campaignLead) {
    return campaignLead.fields;
  }

  return get(state.campaign.additionalContent, 'campaignLead');
}
