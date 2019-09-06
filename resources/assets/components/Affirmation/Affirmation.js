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
import { contentfulImageUrl, query, withoutNulls } from '../../helpers';
import CtaReferralPageBannerContainer from '../utilities/CtaReferralPageBanner/CtaReferralPageBannerContainer';

import './affirmation.scss';

const SIGNUP_COUNT_BADGE = gql`
  query SignupsCountQuery($userId: String!) {
    signupsCount(userId: $userId, limit: 2)
  }
`;

const BADGE_QUERY = gql`
  query AccountQuery($userId: String!) {
    user(id: $userId) {
      hasBadgesFlag: hasFeatureFlag(feature: "badges")
    }
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
    {quote ? (
      <TextContent className="padding-top-md padding-horizontal-md">
        {quote}
      </TextContent>
    ) : null}

    <Query query={BADGE_QUERY} variables={{ userId }} hideSpinner>
      {badgeData =>
        get(badgeData, 'user.hasBadgesFlag', false) ? (
          <Query query={SIGNUP_COUNT_BADGE} variables={{ userId }} hideSpinner>
            {signupData =>
              signupData.signupsCount === 1 ? (
                <Badge
                  earned
                  className="badge padded"
                  size="medium"
                  name="signupBadge"
                >
                  <h4>1 Sign-Up</h4>
                  <p>
                    Congratulations! You signed up for your first campaign...and
                    earned your first badge. NICE. Ready to earn *another*
                    badge? Complete this campaign!
                  </p>
                </Badge>
              ) : null
            }
          </Query>
        ) : null
      }
    </Query>

    <Flex className="flex-align-center">
      <FlexCell className="affirmation__cta padded" width="half">
        <h3>{callToActionHeader}</h3>
        <p>{callToActionDescription}</p>
      </FlexCell>
      <FlexCell className="padded" width="half">
        <Share variant="blue" parentSource="affirmation" />
      </FlexCell>
    </Flex>

    {author ? (
      <Byline
        author={author.fields.name}
        {...withoutNulls(author.fields)}
        photo={contentfulImageUrl(author.fields.photo, 175, 175, 'fill')}
        className="padding-bottom-md padding-horizontal-md"
      />
    ) : null}

    {query('refer-friends') ? <CtaReferralPageBannerContainer /> : null}

    <div className="p-4">
      <button type="button" className="close-button" onClick={onClose}>
        Continue to Campaign
      </button>
    </div>
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
  callToActionDescription:
    "By joining this campaign, you've teamed up with millions of other members who are making an impact on the causes affecting your world. As a DoSomething.org member, you're part of something bigger. You're part of a global movement for good.",
  callToActionHeader: "Woohoo! You're signed up.",
  header: 'Thanks for joining us!',
  quote: null,
};

export default Affirmation;
