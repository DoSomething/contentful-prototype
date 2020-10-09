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
  it('Returns source,source_details if only sourceDetails provided and AUTH is empty', () => {
    global.AUTH = {};

    expect(getTrackingSource('abc', null, null)).toEqual(
      'source:web,source_details:abc',
    );
  });

  /** @test */
  it('Returns user,source,source_details if only sourceDetails provided and AUTH id set', () => {
    global.AUTH = { id: '5f11b692b5892469df438d64' };

    expect(getTrackingSource('abc', null, null)).toEqual(
      'user:5f11b692b5892469df438d64,source:web,source_details:abc',
    );
  });

  /** @test */
  it('Returns source,source_details,group_id if sourceDetails,groupId provided and AUTH is empty', () => {
    global.AUTH = {};

    expect(getTrackingSource('abc', null, 81)).toEqual(
      'source:web,source_details:abc,group_id=81',
    );
  });

  /** @test */
  it('Returns user,source,source_details,group_id,referral if sourceDetails,referrerUserId,groupId provided', () => {
    global.AUTH = { id: '5f11b692b5892469df438d64' };

    expect(getTrackingSource('abc', '5edfc80ecb4dbf2020580a76', 81)).toEqual(
      'user:5edfc80ecb4dbf2020580a76,source:web,source_details:abc,group_id=81,referral=true',
    );
  });

  /** @test */
  it('Appends utm_campaign to source_details if present', () => {
    global.AUTH = {};
    // Mock visiting with UTM parameters .
    window.jsdom.reconfigure({
      url:
        'https://dev.dosomething.org/us/?utm_campaign=puppetsloth_youtube_s3e8',
    });

    expect(getTrackingSource('hellobar')).toEqual(
      'source:web,source_details:hellobar_puppetsloth_youtube_s3e8',
    );
  });
});
