import React from 'react';

import AccountQuery from './AccountQuery';
import Enclosure from '../../Enclosure';
import ProfileRouteContainer from './ProfileRouteContainer';

const ProfilePage = props => (
  <Enclosure className="container margin-bottom-lg">
    <ProfileRouteContainer {...props} />
    <AccountQuery {...props} />
  </Enclosure>
);

export default ProfilePage;
