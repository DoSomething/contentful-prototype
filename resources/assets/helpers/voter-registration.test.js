import { getGoalInfo } from './voter-registration';

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
