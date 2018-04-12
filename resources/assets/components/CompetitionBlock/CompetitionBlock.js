import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Markdown from '../Markdown';
import LazyImage from '../LazyImage';
import { BlockWrapper } from '../Block';
import Byline from '../utilities/Byline/Byline';

import './competitionBlock.scss';

const DEFAULT_CONFIRMATION = `
# You're signed up!

You should receive an email shortly with more instructions.
You can keep working on the campaign for now. I'm so excited to have you onboard!
`;

const CompetitionBlock = props => {
  const {
    content,
    photo,
    byline,
    joinCompetition,
    hasJoinedCompetition,
    hasPendingJoin,
    showConfirmation,
    campaignId,
    campaignRunId,
    checkForCompetition,
    experiment,
    convert,
  } = props;

  if (!content) {
    return null;
  }

  // If we already joined the competition & saw the confirmation message,
  // display nothing.
  if (!showConfirmation && hasJoinedCompetition) {
    return null;
  }

  // If we haven't joined a competition yet or clicked the join button,
  // check for existing competition join.
  if (!showConfirmation && !hasJoinedCompetition) {
    checkForCompetition(campaignId, campaignRunId);
  }

  const button = showConfirmation ? null : (
    <button
      disabled={hasPendingJoin}
      className={classnames('button', { 'is-loading': hasPendingJoin })}
      onClick={() => {
        if (experiment) {
          convert(experiment);
        }
        joinCompetition(campaignId, campaignRunId);
      }}
    >
      join competition
    </button>
  );

  const competitionPhoto =
    photo && !showConfirmation ? (
      <div className="competition-block__photo">
        <LazyImage alt="competition" src={photo} />
      </div>
    ) : null;

  return (
    <BlockWrapper
      title="Go above and beyond!"
      className={classnames('-colorful')}
    >
      <div
        className={classnames('competition-block', {
          'is-confirmation': showConfirmation,
        })}
      >
        <div className="clearfix">
          <Markdown
            className={classnames('', { 'is-success': showConfirmation })}
          >
            {showConfirmation ? DEFAULT_CONFIRMATION : content}
          </Markdown>
          {competitionPhoto}
        </div>
        {button}
        <Byline {...byline} />
      </div>
    </BlockWrapper>
  );
};

CompetitionBlock.propTypes = {
  content: PropTypes.string.isRequired,
  convert: PropTypes.func,
  photo: PropTypes.string,
  byline: PropTypes.shape({
    author: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  experiment: PropTypes.string,
  joinCompetition: PropTypes.func.isRequired,
  checkForCompetition: PropTypes.func.isRequired,
  hasJoinedCompetition: PropTypes.bool.isRequired,
  hasPendingJoin: PropTypes.bool.isRequired,
  showConfirmation: PropTypes.bool.isRequired,
  campaignId: PropTypes.string.isRequired,
  campaignRunId: PropTypes.string.isRequired,
};

CompetitionBlock.defaultProps = {
  photo: null,
  experiment: null,
  convert: () => {},
};

export default CompetitionBlock;
