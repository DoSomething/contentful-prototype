import React from 'react';

import Enclosure from '../../Enclosure';
import ProfileNavigation from './ProfileNavigation';

const ProfilePage = props => (
  <div className="main clearfix">
    <Enclosure className="default-container margin-top-lg margin-bottom-lg">
      <h1>Hey, it&apos;s your profile!</h1>
      <ProfileNavigation {...props} />
    </Enclosure>
  </div>
);

export default ProfilePage;
