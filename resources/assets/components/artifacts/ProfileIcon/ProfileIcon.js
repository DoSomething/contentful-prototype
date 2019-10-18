import React from 'react';

import profileIcon from './profile_icon.svg';

const ProfileIcon = () => (
  <img
    src={profileIcon}
    alt="Account profile icon"
    style={{ pointerEvents: 'none' }}
  />
);

export default ProfileIcon;
