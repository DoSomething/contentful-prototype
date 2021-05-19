import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Card from '../../utilities/Card/Card';
import { tailwind } from '../../../helpers/display';
import Spinner from '../../artifacts/Spinner/Spinner';
import { getHumanFriendlyDate } from '../../../helpers/datetime';
import TooltipQuestionMark from '../../utilities/Tooltip/TooltipQuestionMark';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './campaign-info-block.scss';

const CampaignInfoBlock = ({
  actionItem,
  campaignId,
  endDate,
  hideScholarshipDetails,
  isOpen,
  loading,
  scholarshipAmount,
  scholarshipDeadline,
  showModal,
}) => {
  const handleViewMoreLinkSelect = () => {
    showModal();
    trackAnalyticsEvent('clicked_view_more_link_scholarships', {
      action: 'link_clicked',
      category: EVENT_CATEGORIES.modal,
      label: 'SCHOLARSHIP_MODAL',
      context: { campaignId },
    });
  };

  // Decide if we want to display scholarship information
  let showScholarshipInfo = false;

  if (scholarshipAmount && scholarshipDeadline && isOpen) {
    showScholarshipInfo = true;
  }

  return (
    <Card
      attributes={{ 'data-testid': 'campaign-info-block-container' }}
      className="bordered p-3 rounded campaign-info"
    >
      {loading ? (
        <Spinner className="flex justify-center p-6" />
      ) : (
        <>
          {!showScholarshipInfo ? (
            <h1 className="mb-3 text-lg uppercase">Campaign Info</h1>
          ) : null}
          <dl className="clearfix">
            {showScholarshipInfo ? (
              <>
                <dt className="campaign-info__scholarship">
                  Win A Scholarship
                </dt>
                <dd className="campaign-info__scholarship">
                  {`$${scholarshipAmount.toLocaleString()}`}
                </dd>

                <dt>Next Deadline</dt>
                <dd>{getHumanFriendlyDate(scholarshipDeadline)}</dd>
                {!hideScholarshipDetails ? (
                  <div>
                    <button
                      data-testid="campaign-info-block-scholarship-details-link"
                      className="font-normal underline text-blurple-500 hover:text-blurple-300 pb-4"
                      type="button"
                      css={css`
                        :hover {
                           {
                            text-decoration-color: ${tailwind(
                              'colors.teal.500',
                            )};
                          }
                        }
                      `}
                      onClick={handleViewMoreLinkSelect}
                    >
                      View Scholarship Details
                    </button>
                  </div>
                ) : null}
                <hr className="clear-both pb-3 border-gray-300" />
              </>
            ) : null}

            {endDate && !showScholarshipInfo ? (
              <>
                <dt>Deadline</dt>
                <dd>{getHumanFriendlyDate(endDate)}</dd>
              </>
            ) : null}
            {actionItem && actionItem.timeCommitmentLabel ? (
              <>
                <dt>Time</dt>
                <dd data-testid="time-commitment-value">
                  {actionItem.timeCommitmentLabel}

                  <TooltipQuestionMark
                    tooltipContent={`This is the estimated time it takes to complete this action${
                      actionItem.volunteerCredit
                        ? '. For volunteer credit certificates, the time you enter will show up on your certificate'
                        : ''
                    }.`}
                  />
                </dd>
              </>
            ) : null}
            {actionItem && actionItem.actionLabel ? (
              <>
                <dt>Action Type</dt>
                <dd>{actionItem.actionLabel}</dd>
              </>
            ) : null}
            {actionItem ? (
              <>
                <dt data-testid="volunteer-credit-column">Volunteer Credit</dt>
                <dd data-testid="volunteer-credit-value">
                  {actionItem.volunteerCredit ? 'Yes' : 'No'}

                  <TooltipQuestionMark
                    tooltipContent={
                      actionItem.volunteerCredit ? (
                        <>
                          When you complete this campaign you&apos;ll be able to
                          download a certificate verifying your participation.{' '}
                          <a href="/us/about/volunteer-hours" target="_blank">
                            Learn more
                          </a>
                          .
                        </>
                      ) : (
                        <>
                          This campaign is not eligible for a certificate of
                          proof for volunteer hours.{' '}
                          <a href="/us/about/volunteer-hours" target="_blank">
                            We have plenty of campaigns that are
                          </a>
                          !!
                        </>
                      )
                    }
                  />
                </dd>
              </>
            ) : null}
          </dl>
        </>
      )}
    </Card>
  );
};

CampaignInfoBlock.propTypes = {
  actionItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    actionLabel: PropTypes.string,
    timeCommitmentLabel: PropTypes.string,
    scholarshipEntry: PropTypes.bool,
    reportback: PropTypes.bool,
    volunteerCredit: PropTypes.bool.isRequired,
  }).isRequired,
  endDate: PropTypes.string,
  campaignId: PropTypes.number.isRequired,
  hideScholarshipDetails: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  scholarshipAmount: PropTypes.number,
  scholarshipDeadline: PropTypes.string,
  showModal: PropTypes.func,
};

CampaignInfoBlock.defaultProps = {
  endDate: null,
  hideScholarshipDetails: false,
  scholarshipAmount: null,
  scholarshipDeadline: null,
  showModal: null,
};

export default CampaignInfoBlock;
