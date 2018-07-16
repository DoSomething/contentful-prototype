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
  campaign: {},
  events: {
    queue: [],
  },
  experiments: {},
  notifications: {
    items: [],
  },
  // standalone (campaign independent) pages
  page: {},
  posts: {},
  postSubmissions: {
    items: {},
  },
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
    shouldShowAffirmation: false,
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
    isAuthenticated: false,
    role: null,
  },
};

export default initialState;
