import React from 'react';

import Enclosure from '../../Enclosure';
import ProfileQuery from './ProfileQuery';

const ProfilePage = props => (
  <Enclosure className="container margin-bottom-lg">
    <ProfileQuery userId={props.userId} />
  </Enclosure>
);

export default ProfilePage;
