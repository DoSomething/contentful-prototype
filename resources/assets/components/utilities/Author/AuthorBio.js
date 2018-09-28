import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Figure } from '../../Figure';
import DEFAULT_AVATAR from './default-avatar.png';

import './author-bio.scss';

const AuthorBio = ({ className, description, jobTitle, name, photo }) => {
  console.log([name, description, jobTitle, photo]);

  return (
    <div className={classnames('author-bio', className)}>
      <Figure
        size="small"
        alignment="left"
        image={photo}
        alt={`picture of ${name}`}
        imageClassName="avatar"
        className="margin-bottom-none"
      >
        <p>
          <em>{description || `${jobTitle} at DoSomething.org.`}</em>
        </p>
      </Figure>
    </div>
  );
};

export default AuthorBio;

AuthorBio.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  jobTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string,
};

AuthorBio.defaultProps = {
  className: null,
  description: null,
  photo: DEFAULT_AVATAR,
};
