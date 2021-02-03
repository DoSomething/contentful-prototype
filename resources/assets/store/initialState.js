/**
 * Initial state for the Redux store. This is where we
 * set default values for when the application loads.
 *
 * @type {Object}
 */
const initialState = {
  campaign: {},
  events: {
    queue: [],
  },
  notifications: {
    items: [],
  },
  // standalone (campaign independent) pages
  page: {},
  postSubmissions: {
    items: {},
  },
  signups: {
    data: [],
    shouldShowAffirmation: false,
    isPending: false,
    affiliateMessagingOptIn: false,
  },
  slideshow: {},
  user: {
    id: null,
    isAuthenticated: false,
    role: null,
  },
};

export default initialState;
