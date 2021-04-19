import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Query from '../Query';
import Card from '../utilities/Card/Card';
import { getUserId } from '../../helpers/auth';
import Byline from '../utilities/Byline/Byline';
import { tailwind } from '../../helpers/display';
import Badge from '../pages/AccountPage/Rewards/Badge';
import { contentfulImageUrl } from '../../helpers/contentful';
import TextContent from '../utilities/TextContent/TextContent';
import CtaReferralPageBannerContainer from '../utilities/CtaReferralPageBanner/CtaReferralPageBannerContainer';

import './affirmation.scss';

export const AffirmationBlockFragment = gql`
  fragment AffirmationBlockFragment on AffirmationBlock {
    id
    header
    quote
    callToActionHeader
    callToActionDescription
    author {
      name
      jobTitle
      photo {
        url
      }
    }
  }
`;

const USER_QUERY = gql`
  query UserAccountAndSignupsCountQuery($userId: String!) {
    user(id: $userId) {
      id
    }
    signupsCount(userId: $userId, limit: 2)
  }
`;

// @TODO: Refactor/redesign.
// We seem to have removed the content "photo" from being used in the actual output.
// Also it would be nice to be able to default to the Campaign Lead attached to the
// campaign if no author is provided!
const Affirmation = ({
  author,
  callToActionDescription,
  callToActionHeader,
  header,
  onClose,
  quote,
}) => (
  <Card className="affirmation rounded" title={header}>
    {quote ? <TextContent className="pt-3 px-3">{quote}</TextContent> : null}

    {getUserId() ? (
      <Query query={USER_QUERY} variables={{ userId: getUserId() }}>
        {res => (
          <React.Fragment>
            {res.signupsCount === 1 ? (
              <Badge
                earned
                className="badge p-3"
                size="medium"
                name="signupBadge"
              >
                <h4>1 Sign-Up</h4>
                <p>
                  Congratulations! You signed up for your first campaign...and
                  earned your first badge. NICE. Ready to earn *another* badge?
                  Complete this campaign!
                </p>
              </Badge>
            ) : null}

            <div className="affirmation__cta p-3">
              <h3>{callToActionHeader}</h3>
              <p>{callToActionDescription}</p>
            </div>

            {author ? (
              <Byline
                author={author.name}
                jobTitle={author.jobTitle}
                photo={contentfulImageUrl(
                  get(author, 'photo.url'),
                  175,
                  175,
                  'fill',
                )}
                className="pb-3 px-3"
              />
            ) : null}

            <CtaReferralPageBannerContainer />

            <div className="p-3">
              <button
                type="button"
                css={css`
                  :hover {
                     {
                      text-decoration-color: ${tailwind('colors.teal.500')};
                    }
                  }
                `}
                className="font-normal underline text-blurple-500 hover:text-blurple-300 pb-4"
                onClick={onClose}
              >
                Continue to Campaign
              </button>
            </div>
          </React.Fragment>
        )}
      </Query>
    ) : null}
  </Card>
);

Affirmation.propTypes = {
  author: PropTypes.object,
  callToActionDescription: PropTypes.string,
  callToActionHeader: PropTypes.string,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  quote: PropTypes.string,
};

Affirmation.defaultProps = {
  author: null,
  callToActionDescription: "Let's Do This.",
  header: 'Thanks for joining us!',
  quote:
    "By joining this campaign, you've teamed up with millions of other members who are making an impact on the causes affecting your world. As a DoSomething.org member, you're part of something bigger. You're part of a global movement for good.",
  callToActionHeader: "Woohoo! You're signed up.",
};

export default Affirmation;
