import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import React, { Fragment } from 'react';

import Card from '../../utilities/Card/Card';
import { env, report } from '../../../helpers';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import DoSomethingLogo from '../../utilities/DoSomethingLogo/DoSomethingLogo';
import PlaceholderText from '../../utilities/PlaceholderText/PlaceholderText';
import StartVoterRegistrationForm from '../../utilities/StartVoterRegistrationForm/StartVoterRegistrationForm';

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
  affiliateSponsors,
  attributes,
  campaignId,
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
          <Fragment>
            <p>
              Before you take the quiz, make sure you’re registered to vote!
              Voting is one of the most impactful ways to make a difference on
              the issues that matter to you.
            </p>
            <p>
              You’ll have the option to register online directly with your state
              government or with a general form.
            </p>
          </Fragment>
        </div>
      </div>
      <div className="md:w-1/2 p-6 text-base scholarship-info-block">
        <StartVoterRegistrationForm
          campaignId={campaignId}
          contextSource="voter-registration-quiz-signup-page"
          sourceDetails="quizsignup"
        />
      </div>
    </Card>
  );
};

ScholarshipReferralVoterRegistrationBlock.propTypes = {
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  attributes: PropTypes.object,
  campaignId: PropTypes.number,
  utmLabel: PropTypes.string,
};

ScholarshipReferralVoterRegistrationBlock.defaultProps = {
  affiliateSponsors: [],
  attributes: {},
  campaignId: null,
  utmLabel: null,
};
export default ScholarshipReferralVoterRegistrationBlock;
