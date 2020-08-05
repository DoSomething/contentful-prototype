import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { votingReasons } from './config';
import { query } from '../../../helpers';
import GroupTypeLink from './GroupTypeLink';
import ReferralsInfo from './ReferralsInfo';
import backgroundVrImage from './VoterRegistration-Pattern.png';
import CampaignHeader from '../../utilities/CampaignHeader';

const VoterRegistrationDrivePageBanner = ({ campaignInfo, group, user }) => {
  const { firstName } = user;
  const { title } = campaignInfo;

  /**
   * Query url for voting-reasons param.
   *
   * @return {String}
   */
  const formatQuote = () => {
    const votingReasonsQuery = query('voting-reasons');

    if (!votingReasonsQuery) {
      return null;
    }

    const votingReasonsValues = votingReasonsQuery.split(',');

    if (votingReasonsValues.length === 1) {
      return `, like ${votingReasons[votingReasonsValues[0]]}`;
    }

    if (votingReasonsValues.length === 2) {
      return `, like ${votingReasons[votingReasonsValues[0]]} and ${
        votingReasons[votingReasonsValues[1]]
      }`;
    }

    if (votingReasonsValues.length > 2) {
      let result = '';

      votingReasonsValues.forEach((value, index) => {
        if (index === votingReasonsValues.length - 1) {
          result = `${result}and ${votingReasons[value]}`;
        } else {
          result = `${result}${votingReasons[value]}, `;
        }
      });

      return `, like ${result}`;
    }

    return ' ';
  };

  return (
    <>
      <div className="clearfix bg-gray-100">
        <div
          css={css`
            background-image: url(${backgroundVrImage});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          `}
          className="base-12-grid bg-blurple-400 cover-image pt-8 pb-3 md:py-6"
        >
          <div className="grid-wide-7/10 mb-6">
            <CampaignHeader
              title={title}
              subtitle={`${firstName} wants you to register to vote!`}
              textColor="text-white"
            />
            <div className="markdown">
              <blockquote className="text-white italic">
                <p data-test="voter-registration-drive-page-quote-text">
                  Voting is one of the most impactful ways to make a difference
                  on the causes that matter to us{formatQuote()}. Take 2 minutes
                  and register to vote today!
                </p>

                <p data-test="voter-registration-drive-page-quote-byline">
                  - {firstName}
                </p>
              </blockquote>
              {group ? (
                <GroupTypeLink
                  id={group.groupType.id}
                  name={group.groupType.name}
                />
              ) : null}
            </div>
          </div>

          {group ? (
            <div className="grid-wide-3/10 flex items-center xxl:row-start-1 xxl:row-span-3">
              <ReferralsInfo group={group} user={user} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

VoterRegistrationDrivePageBanner.propTypes = {
  campaignInfo: PropTypes.object.isRequired,
  group: PropTypes.shape({
    goal: PropTypes.number,
    groupType: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  user: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
  }).isRequired,
};

VoterRegistrationDrivePageBanner.defaultProps = {
  group: null,
};

export default VoterRegistrationDrivePageBanner;
