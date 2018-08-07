/* eslint-ignore import/prefer-default-export */

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
