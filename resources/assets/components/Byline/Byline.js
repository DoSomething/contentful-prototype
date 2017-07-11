import React from 'react';
import PropTypes from 'prop-types';
import { Figure } from '../Figure';
import DEFAULT_AVATAR from './default-avatar.png';

const Byline = ({ author, jobTitle, avatar }) => (
  <Figure size="small" alignment="left" verticalAlignment="center" image={avatar} alt={`picture of ${author}`} imageClassName="avatar">
    <strong>{author}</strong><br />
    <p className="footnote">{jobTitle}</p>
  </Figure>
);

Byline.propTypes = {
  author: PropTypes.string,
  jobTitle: PropTypes.string,
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

Byline.defaultProps = {
  author: 'Puppet Sloth',
  jobTitle: 'DoSomething.org Staff',
  avatar: DEFAULT_AVATAR,
};

export default Byline;
