import { toDate } from 'date-fns';

/**
 * Custom formatting for Phoenix triggers events to analytics services.
 *
 * @param  {Object} data
 * @return {void}
 */
export function phoenixEventLog(data) {
  const {
    eventName,
    eventCategory,
    eventAction,
    eventLabel,
    eventContext,
  } = data;

  console.log('Name: ', eventName);
  console.log('Category: ', eventCategory);
  console.log('Action: ', eventAction);
  console.log('Label: ', eventLabel);
  console.log('Context: ', eventContext);
}

/**
 * Log Google Tag Manager events to the console.
 *
 * @param  {Array} args
 * @return {void}
 */
export function googleLog(...args) {
  const trackerName = args[0];
  const data = { ...args[1] };

  const { event: eventName } = data;
  delete data.event;

  console.groupCollapsed(
    '%c ANALYTICS: %s %c %c %s %c@%c %s %c',
    'background-color: rgba(96,47,175,0.5); color: rgba(97,68,144,1); display: inline-block; font-weight: bold; line-height: 1.5;',
    trackerName.toUpperCase(),
    'background-color: transparent; color: rgba(165, 162, 162, 1); font-weight: normal; letter-spacing: 3px; line-height: 1.5;',
    'color: black; font-weight: bold; letter-spacing: normal; line-height: 1.5;',
    'Event',
    'color: rgba(165, 162, 162, 0.8); font-weight: normal;',
    'color: black; font-weight: bold;',
    eventName.startsWith('phoenix_') ? 'Custom Event' : eventName,
    'background-color: rgba(105,157,215,0.5);',
  );

  if (eventName.startsWith('phoenix_')) {
    const { eventAction, eventCategory, eventLabel, ...eventContext } = args[1];

    phoenixEventLog({
      eventName,
      eventAction,
      eventCategory,
      eventLabel,
      eventContext,
    });
  } else {
    switch (eventName) {
      case 'gtm.js':
        console.log('Start:', toDate(args[1]['gtm.start']));
        console.log('Data: ', args[1]);
        break;

      default:
        console.log('Data: ', args[1]);
    }
  }

  console.groupEnd();
}

/**
 * Log Sixpack events to the console.
 *
 * @param  {Object} client
 * @param  {String} action
 * @param  {String} experimentName
 * @param  {Object} experiment
 * @return {void}
 */
export function sixpackLog(client, action, experimentName, experiment) {
  console.groupCollapsed(
    '%c SIXPACK: %c %c %s %c▷%c %s %c',
    'background-color: rgba(151,103,36,0.5); color: rgba(105,72,26,1); display: inline-block; font-weight: bold; line-height: 1.5;',
    'background-color: transparent; color: rgba(165, 162, 162, 1); font-weight: normal; letter-spacing: 3px; line-height: 1.5;',
    'color: black; font-weight: bold; letter-spacing: normal; line-height: 1.5;',
    action,
    'color: rgba(165, 162, 162, 0.8); font-weight: normal;',
    'color: black; font-weight: bold;',
    experimentName,
    'background-color: rgba(105,157,215,0.5);',
  );
  console.log('Experiment:', experiment);
  console.log('Client ID: %s', client.client_id);
  console.log('Sixpack URL: %s', client.base_url);
  console.groupEnd();
}

/**
 * Log Snowplow events to the console.
 *
 * @param  {Array} args
 * @return {void}
 */
export function snowplowLog(...args) {
  const trackerName = args[0];

  const methodName = args[1];

  console.groupCollapsed(
    '%c ANALYTICS: %s %c %c %s %c@%c %s %c',
    'background-color: rgba(96,47,175,0.5); color: rgba(97,68,144,1); display: inline-block; font-weight: bold; line-height: 1.5;',
    trackerName.toUpperCase(),
    'background-color: transparent; color: rgba(165, 162, 162, 1); font-weight: normal; letter-spacing: 3px; line-height: 1.5;',
    'color: black; font-weight: bold; letter-spacing: normal; line-height: 1.5;',
    'Event',
    'color: rgba(165, 162, 162, 0.8); font-weight: normal;',
    'color: black; font-weight: bold;',
    methodName === 'trackStructEvent'
      ? `Custom Event (${methodName})`
      : methodName,
    'background-color: rgba(105,157,215,0.5);',
  );

  switch (methodName) {
    case 'setUserId':
      console.log('User ID:', args[2]);
      break;

    case 'trackStructEvent':
      phoenixEventLog({
        eventName: args[5],
        eventAction: args[3],
        eventCategory: args[2],
        eventLabel: args[4],
        eventContext: JSON.parse(args[7][0].data.payload),
      });
      break;

    case 'trackPageView':
      console.log('Context: ', JSON.parse(args[3][0].data.payload));
      break;

    default:
      console.log(args);
  }
  console.groupEnd();
}
