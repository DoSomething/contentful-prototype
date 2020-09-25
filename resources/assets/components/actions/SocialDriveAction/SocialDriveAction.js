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

const SocialDriveAction = ({ description, fullWidth, link, title }) => (
  <div
    className={classNames('clearfix pb-6 lg:flex', {
      'lg:w-2/3 lg:pr-3': !fullWidth,
    })}
  >
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
  /**
   * This prop allows us to force the "main" block to fill the width of the container.
   * @see https://git.io/Jfnqy
   */
  fullWidth: PropTypes.bool,
  link: PropTypes.string.isRequired,
  title: PropTypes.string,
};

SocialDriveAction.defaultProps = {
  description: null,
  fullWidth: false,
  title: 'Your Online Drive',
};

export default SocialDriveAction;
