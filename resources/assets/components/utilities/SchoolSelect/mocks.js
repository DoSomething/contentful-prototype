/**
 * The tests for this component are split into two, because we aren't able to call MockedProvider
 * twice within a test file.
 */
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
