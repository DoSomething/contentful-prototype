import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Figure } from '../Figure/Figure';
import DEFAULT_AVATAR from './default-avatar.png';

const AuthorBio = ({ className, description, jobTitle, name, photo }) => (
  <div className={classnames('author-bio', className)}>
    <Figure
      size="small"
      alignment="left"
      image={photo}
      alt={`picture of ${name}`}
      imageClassName="avatar"
      className="mb-0"
    >
      <p>
        <em>{description || `${jobTitle} at DoSomething.org.`}</em>
      </p>
    </Figure>
  </div>
);

export default AuthorBio;

AuthorBio.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  jobTitle: PropTypes.string,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
};

AuthorBio.defaultProps = {
  className: null,
  description: null,
  jobTitle: 'Staff',
  photo: DEFAULT_AVATAR,
};
