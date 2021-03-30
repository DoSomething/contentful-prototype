import React from 'react';
import PropTypes from 'prop-types';

import { userLevelLabel } from './RewardLevelsTable';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import MultiLevelProgressBar, {
  SingleLevel,
} from '../../../utilities/ProgressBar/MultiLevelProgressBar';

const RewardsProgressBar = ({ totalBadges }) => {
  const progressSubtitleCopy = badgeCount => {
    let subTitleCopy = 'Just 2 more badges to become a Doer!';

    if (badgeCount >= 8) {
      subTitleCopy =
        '(You have bonus badges for earning the super-secret Staff Fave badge!).';
    }
    if (badgeCount === 7) {
      subTitleCopy =
        '(You have a bonus badge for earning the super-secret Staff Pick badge!).';
    }
    if (badgeCount === 6) {
      subTitleCopy = '';
    }
    if (badgeCount >= 4 && badgeCount <= 5) {
      subTitleCopy = "You're almost to Legend status!";
    }
    if (badgeCount >= 2 && badgeCount <= 3) {
      subTitleCopy = 'Keep up the good work!';
    }
    if (badgeCount === 1) {
      subTitleCopy = 'Just 1 more badge to become a Doer!';
    }
    return subTitleCopy;
  };

  const doerProgress = badges => {
    let doerPercentage = '0%';
    if (badges >= 2) {
      doerPercentage = '100%';
    } else if (badges > 0 && badges < 2) {
      doerPercentage = '50%';
    }
    return doerPercentage;
  };

  const superDoerProgress = badges => {
    let superDoerPercentage = '0%';
    if (badges >= 4) {
      superDoerPercentage = '100%';
    } else if (badges > 2 && badges < 4) {
      superDoerPercentage = '50%';
    }
    return superDoerPercentage;
  };

  const legendProgress = badges => {
    let legendPercentage = '0%';
    if (badges >= 6) {
      legendPercentage = '100%';
    } else if (badges > 4 && badges < 6) {
      legendPercentage = '50%';
    }
    return legendPercentage;
  };

  return (
    <div data-testid="rewards-progress-bar">
      <SectionHeader
        title={
          totalBadges <= 1
            ? 'Earn Rewards'
            : `You're a ${userLevelLabel(totalBadges)}`
        }
      />

      <p
        data-testid="rewards-progress-bar-description"
        className="pt-6 pb-3 text-lg"
      >
        You earned <b>{totalBadges} out of 6 badges</b>
        {totalBadges !== 0
          ? `, which makes you a 
        ${userLevelLabel(totalBadges)}`
          : null}
        . {progressSubtitleCopy(totalBadges)}
      </p>

      <MultiLevelProgressBar
        levelLabels={[
          {
            label: 'Doer',
            subLabel: '2 Badges',
          },
          {
            label: 'SuperDoer',
            subLabel: '4 Badges',
          },
          {
            label: 'Legend',
            subLabel: '6 Badges',
          },
        ]}
      >
        <SingleLevel
          levelProgress={doerProgress(totalBadges)}
          color="bg-teal-500"
        />
        <SingleLevel
          levelProgress={superDoerProgress(totalBadges)}
          color="bg-purple-400"
        />
        <SingleLevel
          levelProgress={legendProgress(totalBadges)}
          color="bg-yellow-400"
        />
      </MultiLevelProgressBar>
    </div>
  );
};

RewardsProgressBar.propTypes = {
  totalBadges: PropTypes.number.isRequired,
};

export default RewardsProgressBar;
