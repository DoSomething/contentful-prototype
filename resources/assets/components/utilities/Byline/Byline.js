import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Figure } from '../../Figure';
import DEFAULT_AVATAR from './default-avatar.png';

import './byline.scss';

/**
 * The <Byline /> component accepts details
 * about an author and the option to add a
 * Facebook share.
 */
const Byline = ({ author, jobTitle, photo, share, className }) => (
  <div className={classnames('byline', className)}>
    <Figure
      size="small"
      alignment="left"
      image={photo}
      alt={`picture of ${author}`}
      imageClassName="avatar"
      className="margin-bottom-none"
    >
      <strong>{author}</strong>
      <br />
      <p className="footnote">{jobTitle}</p>
    </Figure>
    {share}
  </div>
);

Byline.propTypes = {
  author: PropTypes.string,
  className: PropTypes.string,
  jobTitle: PropTypes.string,
  photo: PropTypes.string,
  share: PropTypes.node,
};

Byline.defaultProps = {
  author: 'Puppet Sloth',
  className: null,
  jobTitle: 'DoSomething.org Staff',
  photo: DEFAULT_AVATAR,
  share: null,
};

export default Byline;
