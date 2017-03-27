/**
 * Create normalized entities from the reportback response.
 * @returns {Object}
 * @param data
 */
export function normalizeReportbacksResponse(data) {
  let reportbacks = {};
  let reportbackItems = {};
  let reactions = {};

  data.forEach((reportback) => {
    reportback.reportback_items = reportback.reportback_items.data.map((item) => {
      const currentUser = item.kudos.data[0] ? item.kudos.data[0].current_user : false;

      reactions[item.id] = {
        id: currentUser ? currentUser.kudos_id : null,
        total: item.kudos.data[0] ? item.kudos.data[0].term.total : 0,
        termId: item.kudos.data[0] ? item.kudos.data[0].term.id : '1274', // This is a hardcoded default because phoenix-ashes is bugged.
      };

      reportbackItems[item.id] = item;
      return item.id;
    });

    delete reportback.campaign;
    reportbacks[reportback.id] = reportback;
  });

  return {reportbacks, reportbackItems, reactions};
}
