import { RestApiClient } from '@dosomething/gateway';

import { API } from '../constants/action-types';
import { PHOENIX_URL } from '../constants';

/**
 * Middleware for handling API actions.
 */
const apiMiddleware = () => next => (action) => {
  if (action.type !== API) {
    return next(action);
  }

  const { payload } = action;

  switch (action.method) {
    case 'POST':
      // console.log('🎃 what is in the form data:');
      // for (var value of payload.body.values()) {
      //   console.log(value);
      // }

      const clientPost = new RestApiClient(PHOENIX_URL, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      // console.log(clientPost);
      // console.log('🚀 request is about to be sent!');
      return clientPost.post(payload.url, payload.body)
        .then((response) => {
          // console.log('🌶');
          console.log(response);
        })
        .catch(error => {
          // console.log('🌹 caught the error!');
          console.log(error.response);
        });

      // const token = document.querySelector('meta[name="csrf-token"]');
      // return window.fetch(payload.url, {
      //   method: 'POST',
      //   headers: {
      //     'X-CSRF-Token': token ? token.getAttribute('content') : null,
      //     Accept: 'application/json',
      //   },
      //   credentials: 'same-origin',
      //   body: payload.body,
      // })
      //   .then((response) => {
      //     console.log('😿');
      //     console.log(response);
      //     console.log(response.status);
      //     response.json().then((data) => {
      //       console.log(data);
      //     });
      //   });

    case 'GET':
      const clientGet = new RestApiClient(PHOENIX_URL);

      console.log('GET request...');
      console.log(payload.url);
      console.log(payload.query);
      return;

    default:
      return;
  }

  return next(action);
};

export default apiMiddleware;

// if (window.ENV.APP_ENV !== 'production') {
//   client.get(payload.url, payload.query)
//     .then((response) => {
//       // @TODO: more to come with handling the response!
//       if (response && response.data) {
//         console.groupCollapsed('%c API Middleware Response: ',
//           'background-color: rgba(137,161,188,0.5); color: rgba(33,70,112,1); display: block; font-weight: bold; line-height: 1.5;',
//         );
//         console.table(response.data);
//         console.groupEnd();
//       } else {
//         console.log('Nope, nothing to see here for now...');
//       }
//     });
// }
