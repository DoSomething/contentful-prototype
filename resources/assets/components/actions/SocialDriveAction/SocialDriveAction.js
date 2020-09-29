import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../../utilities/Card/Card';
import ShortLinkShareContainer from '../../utilities/ShortLinkShare/ShortLinkShareContainer';

export const SocialDriveBlockFragment = gql`
  fragment SocialDriveBlockFragment on SocialDriveBlock {
    link
    title
    description
  }
`;

const SocialDriveAction = ({ className, description, link, title }) => (
  <div className={classNames('clearfix pb-6', className)}>
    <Card className="rounded bordered" title={title}>
      {description ? <p className="p-3">{description}</p> : null}

      <ShortLinkShareContainer link={link} />
    </Card>
  </div>
);

SocialDriveAction.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  title: PropTypes.string,
};

SocialDriveAction.defaultProps = {
  className: null,
  description: null,
  title: 'Your Online Drive',
};

export default SocialDriveAction;
