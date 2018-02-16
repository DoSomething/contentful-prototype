/**
 * Initial state for the Redux store. This is where we
 * set default values for when the application loads.
 *
 * @type {Object}
 */
const initialState = {
  admin: {
    shouldShowLandingPage: false,
    shouldShowActionPage: false,
  },
  blocks: {
    page: 1,
  },
  campaign: {
    activityFeed: [],
  },
  competitions: {
    data: [],
    thisCampaign: false,
    showConfirmation: false,
    isPending: false,
  },
  events: {
    queue: [],
  },
  experiments: {},
  modal: {
    modalType: null,
    contentfulId: null,
    shouldShowModal: false,
  },
  notifications: {
    items: [],
  },
  posts: {},
  quiz: {},
  reportbacks: {
    currentPage: 0,
    isFetching: false,
    total: 0,
    totalPages: 1,
    ids: [],
    entities: {},
    itemEntities: {},
  },
  signups: {
    data: [],
    thisCampaign: false,
    thisSession: false,
    isPending: false,
    total: 0,
    affiliateMessagingOptOut: false,
  },
  slideshow: {},
  submissions: {
    reportback: {},
    isFetching: false,
    isStoring: false,
    items: [],
    messaging: null,
  },
  uploads: {},
  user: {
    id: null,
    role: null,
  },
};

export default initialState;
