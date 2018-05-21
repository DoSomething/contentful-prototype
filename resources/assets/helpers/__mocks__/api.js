export function getUserCampaignSignups(
  userId,
  campaignId,
  campaignRunId = null,
) {
  const signup = {
    data: [
      {
        id: 123456,
        northstar_id: userId,
        campaign_id: campaignId,
        campaign_run_id: campaignRunId,
        quantity: 30,
        why_participated: 'Because I love to test things.',
        source: 'phoenix',
        details: null,
      },
    ],
  };

  return new Promise((resolve, reject) => {
    resolve(signup);
  });
}
