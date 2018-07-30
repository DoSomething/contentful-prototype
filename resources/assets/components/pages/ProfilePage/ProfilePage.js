import React from 'react';

import Enclosure from '../../Enclosure';
import ProfileQueryContainer from './ProfileQueryContainer';

const ProfilePage = props => (
  <Enclosure className="container margin-bottom-lg">
    <ProfileQueryContainer {...props} />
  </Enclosure>
);

export default ProfilePage;
