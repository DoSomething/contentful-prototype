import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Query from '../../Query';
import Card from '../../utilities/Card/Card';
import Modal from '../../utilities/Modal/Modal';
import Badge from '../../pages/AccountPage/Badge';
import TextContent from '../../utilities/TextContent/TextContent';

const BADGE_QUERY = gql`
  query AccountQuery($userId: String!) {
    user(id: $userId) {
      hasBadgesFlag: hasFeatureFlag(feature: "badges")
    }
  }
`;

const POST_COUNT_BADGE = gql`
  query PostsCountQuery($userId: String!) {
    postsCount(userId: $userId, limit: 4)
  }
`;

const PhotoSubmissionConfirmation = ({
  affirmationContent,
  onClose,
  userId,
}) => (
  <Modal onClose={onClose}>
    <Card className="bordered rounded" title="We got your photo!">
      <Query query={BADGE_QUERY} variables={{ userId }} hideSpinner>
        {badgeData =>
          get(badgeData, 'user.hasBadgesFlag', false) ? (
            <Query query={POST_COUNT_BADGE} variables={{ userId }} hideSpinner>
              {postData => {
                if (postData.postsCount === 1) {
                  return (
                    <Badge
                      earned
                      className="badge p-3"
                      size="medium"
                      name="onePostBadge"
                    >
                      <h4>1 Action</h4>
                      <p>
                        Ohhh HECK yes! You just earned a new badge for
                        completing your first campaign. Congratulations!
                      </p>
                      <a href="/us/account/profile/badges">
                        View all my badges
                      </a>
                    </Badge>
                  );
                }

                if (postData.postsCount === 2) {
                  return (
                    <Badge
                      earned
                      className="badge p-3"
                      size="medium"
                      name="twoPostsBadge"
                    >
                      <h4>2 Actions</h4>
                      <p>
                        Ohhh HECK yes! You just earned a new badge for
                        completing your second campaign. Congratulations!
                      </p>
                      <a href="/us/account/profile/badges">
                        View all my badges
                      </a>
                    </Badge>
                  );
                }

                if (postData.postsCount === 3) {
                  return (
                    <Badge
                      earned
                      className="badge p-3"
                      size="medium"
                      name="threePostsBadge"
                    >
                      <h4>3 Actions</h4>
                      <p>
                        Ohhh HECK yes! You just earned a new badge for
                        completing your third campaign. Congratulations!
                      </p>
                      <a href="/us/account/profile/badges">
                        View all my badges
                      </a>
                    </Badge>
                  );
                }

                return null;
              }}
            </Query>
          ) : null
        }
      </Query>

      <TextContent className="p-3">{affirmationContent}</TextContent>
    </Card>
  </Modal>
);

PhotoSubmissionConfirmation.propTypes = {
  affirmationContent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PhotoSubmissionConfirmation;
