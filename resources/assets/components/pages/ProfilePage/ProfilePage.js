import React from 'react';

import Enclosure from '../../Enclosure';
import ProfileRouteContainer from './ProfileRouteContainer';

const ProfilePage = props => (
  <Enclosure className="container margin-bottom-lg">
    <ProfileRouteContainer {...props} />
  </Enclosure>
);

export default ProfilePage;
