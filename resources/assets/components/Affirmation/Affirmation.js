import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../Query';
import { Flex, FlexCell } from '../Flex';
import Card from '../utilities/Card/Card';
import Share from '../utilities/Share/Share';
import Badge from '../pages/AccountPage/Badge';
import Byline from '../utilities/Byline/Byline';
import TextContent from '../utilities/TextContent/TextContent';
import { contentfulImageUrl } from '../../helpers';
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
      hasBadgesFlag: hasFeatureFlag(feature: "badges")
      hasReferFriendsScholarshipFlag: hasFeatureFlag(
        feature: "refer-friends-scholarship"
      )
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
  userId,
}) => (
  <Card className="affirmation rounded" title={header}>
    {quote ? <TextContent className="pt-3 px-3">{quote}</TextContent> : null}

    {userId ? (
      <Query query={USER_QUERY} variables={{ userId }}>
        {res => (
          <React.Fragment>
            {get(res, 'user.hasBadgesFlag', false) && res.signupsCount === 1 ? (
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

            <Flex className="flex-align-center">
              <FlexCell className="affirmation__cta p-3" width="half">
                <h3>{callToActionHeader}</h3>
                <p>{callToActionDescription}</p>
              </FlexCell>
              <FlexCell className="p-3" width="half">
                <Share variant="blue" parentSource="affirmation" />
              </FlexCell>
            </Flex>

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

            {get(res, 'user.hasReferFriendsScholarshipFlag', false) ? (
              <CtaReferralPageBannerContainer />
            ) : null}

            <div className="p-3">
              <button
                type="button"
                className="close-button font-bold text-base"
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
  userId: PropTypes.string.isRequired,
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
