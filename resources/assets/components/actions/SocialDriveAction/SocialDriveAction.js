import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import ShortLinkShareContainer from '../../utilities/ShortLinkShare/ShortLinkShareContainer';

export const SocialDriveBlockFragment = gql`
  fragment SocialDriveBlockFragment on SocialDriveBlock {
    link
    title
    description
  }
`;

const SocialDriveAction = ({ description, link, title }) => (
  <div className="clearfix pb-6 lg:flex lg:w-2/3 lg:pr-3">
    <Card className="rounded bordered" title={title}>
      {description ? (
        <div className="p-3">
          <p>{description}</p>
        </div>
      ) : null}

      <ShortLinkShareContainer link={link} />
    </Card>
  </div>
);

SocialDriveAction.propTypes = {
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  title: PropTypes.string,
};

SocialDriveAction.defaultProps = {
  description: null,
  title: 'Your Online Drive',
};

export default SocialDriveAction;
