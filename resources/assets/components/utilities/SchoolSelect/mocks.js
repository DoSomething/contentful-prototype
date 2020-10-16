import { SEARCH_SCHOOLS_QUERY } from './SchoolSelect';

export const location = 'US-NJ';

export const requests = [
  {
    request: {
      query: SEARCH_SCHOOLS_QUERY,
      variables: {
        location,
        name: null,
      },
    },
    result: {
      data: {
        searchSchools: [],
      },
    },
  },
];
