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

export function googleLog() {
  console.groupCollapsed(
    '%c ANALYTICS: %s %c %c %s %c@%c dataLayer.push() %c',
    'background-color: rgba(96,47,175,0.5); color: rgba(97,68,144,1); display: inline-block; font-weight: bold; line-height: 1.5;',
    arguments[0].toUpperCase(),
    'background-color: transparent; color: rgba(165, 162, 162, 1); font-weight: normal; letter-spacing: 3px; line-height: 1.5;',
    'color: black; font-weight: bold; letter-spacing: normal; line-height: 1.5;',
    'Function Name',
    'color: rgba(165, 162, 162, 0.8); font-weight: normal;',
    'color: black; font-weight: bold;',
    'background-color: rgba(105,157,215,0.5);',
  );
  console.log(arguments);
  console.groupEnd();
}

export function snowplowLog() {
  console.groupCollapsed(
    '%c ANALYTICS: %s %c %c %s %c@%c %s %c',
    'background-color: rgba(96,47,175,0.5); color: rgba(97,68,144,1); display: inline-block; font-weight: bold; line-height: 1.5;',
    arguments[0].toUpperCase(),
    'background-color: transparent; color: rgba(165, 162, 162, 1); font-weight: normal; letter-spacing: 3px; line-height: 1.5;',
    'color: black; font-weight: bold; letter-spacing: normal; line-height: 1.5;',
    'Function Name',
    'color: rgba(165, 162, 162, 0.8); font-weight: normal;',
    'color: black; font-weight: bold;',
    arguments[1],
    'background-color: rgba(105,157,215,0.5);',
  );

  switch (arguments[1]) {
    case 'setUserId':
      console.log('User ID:', arguments[2]);
      break;

    case 'trackStructEvent':
      console.log('Category: ', arguments[2]);
      console.log('Action: ', arguments[3]);
      console.log('Label: ', arguments[4]);
      console.log('Name: ', arguments[5]);
      // arguments[5] is always null
      console.log('Context: ', JSON.parse(arguments[7][0]['data']['payload']));
      break;

    case 'trackPageView':
      console.log('Context: ', JSON.parse(arguments[3][0]['data']['payload']));
      break;

    default:
      console.log(arguments);
  }
  console.groupEnd();
}
