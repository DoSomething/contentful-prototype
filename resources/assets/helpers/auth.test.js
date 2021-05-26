import { buildAuthRedirectUrl } from './auth';

describe('buildAuthRedirectUrl', () => {
  it('Builds an authentication redirect URL using custom parameters', () => {
    const actionId = '123';
    const destination = '/us/about';
    const options = { contentful__id: '456' };

    expect(buildAuthRedirectUrl({ actionId, destination, options })).toEqual(
      `http://localhost/authorize?actionId=123&destination=%2Fus%2Fabout&options=%7B%22contentful__id%22%3A%22456%22%7D`,
    );
  });

  it('Works without the parameter', () => {
    expect(buildAuthRedirectUrl({ actionsId: null })).toEqual(
      'http://localhost/authorize?options=%7B%7D',
    );
  });

  it('Ignores undefined parameter values', () => {
    expect(buildAuthRedirectUrl({ actionsId: null })).toEqual(
      'http://localhost/authorize?options=%7B%7D',
    );
  });
});
