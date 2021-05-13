import { get } from 'lodash';
import gql from 'graphql-tag';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useQuery } from 'react-apollo';
import React, { Fragment, useState } from 'react';

import Card from '../../utilities/Card/Card';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { report } from '../../../helpers/monitoring';
import ScholarshipActionType from './ScholarshipActionType';
import MenuCarat from '../../artifacts/MenuCarat/MenuCarat';
import ScholarshipRequirements from './ScholarshipRequirements';
import ScholarshipInstructions from './ScholarshipInstructions';
import { getHumanFriendlyDate } from '../../../helpers/datetime';
import TextContent from '../../utilities/TextContent/TextContent';
import ScholarshipMoneyHand from '../../../images/scholarships.svg';
import DoSomethingLogo from '../../utilities/DoSomethingLogo/DoSomethingLogo';
import ScholarshipInfoBlockTitle from '../../utilities/ScholarshipInfoBlockTitle/ScholarshipInfoBlockTitle';

import './scholarshipInfoBlock.scss';

const SCHOLARSHIP_INFO_QUERY = gql`
  query ScholarshipInfoQuery($campaignId: Int!) {
    actions(campaignId: $campaignId) {
      id
      actionLabel
      scholarshipEntry
      reportback
    }

    campaign(id: $campaignId) {
      id
      endDate
    }
  }
`;

const ScholarshipInfoBlock = ({
  actionIdToDisplay,
  affiliateSponsors,
  attributes,
  campaignId,
  children,
  scholarshipAmount,
  scholarshipCallToAction,
  scholarshipDeadline,
  scholarshipDescription,
  numberOfScholarships,
  utmLabel,
}) => {
  const {
    loading: scholarshipLoading,
    error: scholarshipError,
    data: scholarshipData,
  } = useQuery(SCHOLARSHIP_INFO_QUERY, {
    variables: { campaignId },
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsLabel, setDetailsLabel] = useState('Show');

  const isVisible = css`
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap; /* added line */
  `;

  const toggleHiddenInfo = () => {
    setDrawerOpen(!drawerOpen);
    setDetailsLabel(drawerOpen ? 'Show' : 'Hide');
  };

  const isLoaded = !scholarshipLoading;
  const endDate = get(scholarshipData, 'campaign.endDate');
  const actions = get(scholarshipData, 'actions', []);

  // Decide which action to display
  let actionItem;

  if (actionIdToDisplay) {
    actionItem = actions.find(action => action.id === actionIdToDisplay);
  } else {
    actionItem = actions.find(
      action => action.scholarshipEntry && action.reportback,
    );
  }

  const actionType = get(actionItem, 'actionLabel', '');
  if (scholarshipError) {
    console.error(`[ErrorBlock] ${scholarshipError}`);
    report(scholarshipError);
    return <ErrorBlock error={scholarshipError} />;
  }

  return (
    <Card attributes={attributes} className="flex flex-col-reverse md:flex-row">
      <div className="md:w-1/2 p-6 mx-2 md:mx-4">
        <div className="h-16">
          <div className="float-left mr-4">
            <DoSomethingLogo className="h-16" />
          </div>
          {affiliateSponsors.length ? (
            <Fragment>
              <div className="h-full pt-2 float-left text-4xl text-black leading-none">
                &times;
              </div>
              <div className="__image ml-4 float-left">
                <img
                  className="h-16"
                  src={affiliateSponsors[0].fields.logo.url}
                  alt={affiliateSponsors[0].fields.logo.title}
                />
              </div>
            </Fragment>
          ) : null}
        </div>
        <div className="pt-6 pb-8 clear-both">
          <ScholarshipInfoBlockTitle
            campaignId={campaignId}
            utmLabel={utmLabel}
          />{' '}
          {scholarshipDescription ? (
            <TextContent>{scholarshipDescription}</TextContent>
          ) : (
            <p>
              Ready to earn scholarships for doing good? Just follow the simple
              instructions for the chance to win. Let’s Do This!
            </p>
          )}
        </div>
        <div className="bg-gray-100 flex">
          <div
            className="bg-no-repeat bg-cover bg-center w-1/4 lg:w-1/6"
            style={{ backgroundImage: `url(${ScholarshipMoneyHand})` }}
          />
          <p className="w-3/4 lg:w-5/6 px-4 py-2 text-xs sm:text-base md:text-xs lg:text-sm">
            Since 1993, DoSomething.org has given out more than{' '}
            <b>$5,000,000</b> in scholarships. Check out stories from some of
            our{' '}
            <a
              href="https://www.dosomething.org/us/articles/scholarship-winners"
              rel="noopener noreferrer"
              target="_blank"
              className="underline text-black font-normal"
            >
              past winners
            </a>
            .
          </p>
        </div>
        {children}
      </div>
      <div className="md:w-1/2 p-6 text-base scholarship-info-block">
        <div className="bg-white mx-2 my-6 md:mx-6 md:my-10 p-6 pb-4 rounded">
          {scholarshipAmount ? (
            <div>
              <h4 className="font-bold uppercase text-purple-600">
                {scholarshipCallToAction}
              </h4>
              <p className="font-league-gothic text-5xl pb-4">
                ${scholarshipAmount.toLocaleString()}
              </p>
            </div>
          ) : null}
          <div>
            <div className="lg:flex">
              {scholarshipDeadline ? (
                <div className="lg:w-1/2 lg:float-left">
                  <h4 className="font-bold uppercase text-gray-600">
                    Next Deadline
                  </h4>
                  <p className="pb-4">
                    {getHumanFriendlyDate(scholarshipDeadline)}
                  </p>
                </div>
              ) : null}
              <Media queries={{ small: '(max-width: 480px)' }}>
                {matches => (
                  <Fragment>
                    {matches.small ? (
                      <div css={!drawerOpen ? isVisible : null}>
                        <ScholarshipActionType
                          isLoaded={isLoaded}
                          actionLabel={actionType}
                        />
                      </div>
                    ) : (
                      <ScholarshipActionType
                        isLoaded={isLoaded}
                        actionLabel={actionType}
                      />
                    )}
                  </Fragment>
                )}
              </Media>
            </div>
            <div className="lg:flex">
              <Media queries={{ small: '(max-width: 480px)' }}>
                {matches => (
                  <Fragment>
                    {matches.small ? (
                      <div css={!drawerOpen ? isVisible : null}>
                        <ScholarshipRequirements />
                      </div>
                    ) : (
                      <ScholarshipRequirements />
                    )}
                  </Fragment>
                )}
              </Media>
              <Media queries={{ small: '(max-width: 480px)' }}>
                {matches => (
                  <Fragment>
                    {matches.small ? (
                      <div css={!drawerOpen ? isVisible : null}>
                        <ScholarshipInstructions
                          numberOfScholarships={numberOfScholarships}
                          endDate={getHumanFriendlyDate(endDate)}
                        />
                      </div>
                    ) : (
                      <ScholarshipInstructions
                        numberOfScholarships={numberOfScholarships}
                        endDate={getHumanFriendlyDate(endDate)}
                      />
                    )}
                  </Fragment>
                )}
              </Media>
            </div>
          </div>
          <div className="sm:hidden text-center align-bottom flex justify-center">
            <button
              type="button"
              className="flex items-center focus:outline-none"
              onClick={toggleHiddenInfo}
            >
              <p className="text-sm font-bold">{`${detailsLabel} Details`}</p>
              <MenuCarat flipped={drawerOpen} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

ScholarshipInfoBlock.propTypes = {
  actionIdToDisplay: PropTypes.number,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  attributes: PropTypes.object,
  campaignId: PropTypes.number,
  children: PropTypes.object,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipCallToAction: PropTypes.string,
  scholarshipDeadline: PropTypes.string.isRequired,
  scholarshipDescription: PropTypes.object,
  numberOfScholarships: PropTypes.number.isRequired,
  utmLabel: PropTypes.string,
};

ScholarshipInfoBlock.defaultProps = {
  actionIdToDisplay: null,
  affiliateSponsors: [],
  attributes: {},
  campaignId: null,
  children: null,
  scholarshipCallToAction: 'Win A Scholarship',
  scholarshipDescription: null,
  utmLabel: null,
};
export default ScholarshipInfoBlock;
