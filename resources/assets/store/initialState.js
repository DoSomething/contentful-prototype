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
  signups: {
    data: [],
    thisCampaign: false,
    shouldShowAffirmation: false,
    isPending: false,
    total: 0,
    affiliateMessagingOptIn: false,
  },
  slideshow: {},
  uploads: {},
  user: {
    id: null,
    isAuthenticated: false,
    role: null,
  },
};

export default initialState;
