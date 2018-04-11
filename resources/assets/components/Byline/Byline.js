import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Figure } from '../Figure';
import DEFAULT_AVATAR from './default-avatar.png';

import './byline.scss';

const Byline = ({ author, jobTitle, avatar, share, className }) => (
  <div className={classnames('byline', className)}>
    <Figure
      size="small"
      alignment="left"
      image={avatar}
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
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  share: PropTypes.node,
};

Byline.defaultProps = {
  author: 'Puppet Sloth',
  className: null,
  jobTitle: 'DoSomething.org Staff',
  avatar: DEFAULT_AVATAR,
  share: null,
};

export default Byline;
