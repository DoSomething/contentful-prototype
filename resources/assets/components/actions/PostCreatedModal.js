import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Query from '../Query';
import Card from '../utilities/Card/Card';
import Modal from '../utilities/Modal/Modal';
import Badge from '../pages/AccountPage/Rewards/Badge';
import TextContent from '../utilities/TextContent/TextContent';

const POST_COUNT_BADGE = gql`
  query PostsCreatedModalCountQuery($userId: String!) {
    postsCount(userId: $userId, limit: 4)
  }
`;

const PostCreatedModal = ({ affirmationContent, onClose, title, userId }) => (
  <Modal onClose={onClose} trackingId="REPORTBACK_AFFIRMATION_MODAL">
    <Card className="bordered rounded" title={title}>
      {userId ? (
        <Query query={POST_COUNT_BADGE} variables={{ userId }} hideSpinner>
          {postData => {
            const count = postData.postsCount;

            if (!count || count > 3) {
              return null;
            }

            const config = {
              1: {
                className: 'onePostBadge',
                descriptor: 'first',
              },
              2: {
                className: 'twoPostsBadge',
                descriptor: 'second',
              },
              3: {
                className: 'threePostsBadge',
                descriptor: 'third',
              },
              4: {
                className: 'fourPostsBadge',
                descriptor: 'fourth',
              },
            };

            return (
              <Badge
                earned
                className="badge p-3"
                size="medium"
                name={config[count].className}
              >
                <h4>
                  {count} Action{count > 1 ? 's' : null}
                </h4>
                <p>
                  Ohhh HECK yes! You just earned a new badge for completing your{' '}
                  {config[count].descriptor} campaign. Congratulations!
                </p>
                <a href="/us/account/badges">View all my badges</a>
              </Badge>
            );
          }}
        </Query>
      ) : null}

      <TextContent className="p-3">{affirmationContent}</TextContent>
    </Card>
  </Modal>
);

PostCreatedModal.propTypes = {
  affirmationContent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

PostCreatedModal.defaultProps = {
  userId: null,
};

export default PostCreatedModal;
