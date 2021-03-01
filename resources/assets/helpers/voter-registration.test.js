import { getGoalInfo, getTrackingSource } from './voter-registration';

describe('getGoalInfo', () => {
  /** @test */
  it('Returns percentage for goal amount if goal amount is given', () => {
    expect(getGoalInfo(3, 2)).toEqual({
      goal: 3,
      percentage: 67,
      description: '67% to your goal!',
    });
  });

  /** @test */
  it('Returns percentage for goal of 50 if no goal amount is given', () => {
    expect(getGoalInfo(null, 10)).toEqual({
      goal: 50,
      percentage: 20,
      description: '20% to your goal!',
    });
  });

  /** @test */
  it('Returns emoji description if percentage over 100', () => {
    expect(getGoalInfo(10, 20)).toEqual({
      goal: 10,
      percentage: 200,
      description: `🎉 You're at 200% of your goal! 🎉`,
    });
  });
});

describe('getTrackingSource', () => {
  /** @test */
  it('Returns source,source_details if only source & sourceDetails provided and AUTH is empty', () => {
    global.AUTH = {};

    expect(getTrackingSource({ source: 'web', sourceDetails: 'abc' })).toEqual(
      'source:web,source_details:abc',
    );
  });

  /** @test */
  it('Returns user,source,source_details if only source & sourceDetails provided and AUTH id set', () => {
    global.AUTH = { id: '5f11b692b5892469df438d64' };

    expect(getTrackingSource({ source: 'web', sourceDetails: 'abc' })).toEqual(
      'user:5f11b692b5892469df438d64,source:web,source_details:abc',
    );
  });

  /** @test */
  it('Returns source,source_details,group_id if source, sourceDetails, groupId provided and AUTH is empty', () => {
    global.AUTH = {};

    expect(
      getTrackingSource({ source: 'web', sourceDetails: 'abc', groupId: 81 }),
    ).toEqual('source:web,source_details:abc,group_id=81');
  });

  /** @test */
  it('Returns user,source,source_details,group_id,referral if source, sourceDetails, referrerUserId, groupId provided', () => {
    global.AUTH = { id: '5f11b692b5892469df438d64' };

    expect(
      getTrackingSource({
        source: 'web',
        sourceDetails: 'abc',
        referrerUserId: '5edfc80ecb4dbf2020580a76',
        groupId: 81,
      }),
    ).toEqual(
      'user:5edfc80ecb4dbf2020580a76,source:web,source_details:abc,group_id=81,referral=true',
    );
  });

  /** @test */
  it('Appends UTMs to source_details if present', () => {
    global.AUTH = {};
    // Mock visiting with UTM parameters .
    window.jsdom.reconfigure({
      url:
        'https://dev.dosomething.org/us/?utm_source=scholarship_listing&utm_campaign=fastweb_2020',
    });

    expect(
      getTrackingSource({ source: 'web', sourceDetails: 'hellobar' }),
    ).toEqual(
      'source:web,source_details:hellobar_scholarship_listing_fastweb_2020',
    );
  });
});
