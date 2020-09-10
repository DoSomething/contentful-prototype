import { get } from 'lodash';
import gql from 'graphql-tag';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useQuery } from 'react-apollo';
import React, { Fragment } from 'react';

import Card from '../../utilities/Card/Card';
import TextContent from '../../utilities/TextContent/TextContent';
import ScholarshipMoneyHand from '../../../images/scholarships.svg';
import { env, getHumanFriendlyDate, report } from '../../../helpers';
import DoSomethingLogo from '../../utilities/DoSomethingLogo/DoSomethingLogo';
import PlaceholderText from '../../utilities/PlaceholderText/PlaceholderText';
import ErrorBlock from '../ErrorBlock/ErrorBlock';

import '../ScholarshipInfoBlock/scholarshipInfoBlock.scss';

/**
 * The GraphQL query to load data for this component.
 */
const SCHOLARSHIP_AFFILIATE_QUERY = gql`
  query ScholarshipAffiliateQuery($utmLabel: String!, $preview: Boolean!) {
    affiliate(utmLabel: $utmLabel, preview: $preview) {
      title
    }
  }
`;

const ScholarshipReferralVoterRegistrationBlock = ({
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
  const { loading, error, data } = useQuery(SCHOLARSHIP_AFFILIATE_QUERY, {
    skip: utmLabel === null,
    variables: {
      utmLabel,
      preview: env('CONTENTFUL_USE_PREVIEW_API'),
      campaignId,
    },
  });

  const isLoaded = !loading;
  const affiliateTitle = get(data, 'affiliate.title');

  if (error) {
    console.error(`[ErrorBlock] ${error}`);
    report(error);
    return <ErrorBlock error={error} />;
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
          {isLoaded ? (
            <strong className="text-lg">
              Welcome
              {affiliateTitle
                ? ` from ${affiliateTitle.toUpperCase()}`
                : ' to DoSomething.org!'}
              !
            </strong>
          ) : (
            <PlaceholderText size="large" />
          )}{' '}
          {scholarshipDescription ? (
            <TextContent>{scholarshipDescription}</TextContent>
          ) : (
            <p>
              Ready to earn scholarships for doing good? Just follow the simple
              instructions for the chance to win. Let’s Do This!
            </p>
          )}
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
              <p className="text-sm font-bold pr-2">{`${detailsLabel} Details`}</p>
              <MenuCarat
                cssStyles={
                  drawerOpen
                    ? css`
                        transform: rotate(180deg);
                      `
                    : null
                }
              />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

ScholarshipReferralVoterRegistrationBlock.propTypes = {
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

ScholarshipReferralVoterRegistrationBlock.defaultProps = {
  actionIdToDisplay: null,
  affiliateSponsors: [],
  attributes: {},
  campaignId: null,
  children: null,
  scholarshipCallToAction: 'Win A Scholarship',
  scholarshipDescription: null,
  utmLabel: null,
};
export default ScholarshipReferralVoterRegistrationBlock;
