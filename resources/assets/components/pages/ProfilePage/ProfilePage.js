import React from 'react';

import Enclosure from '../../Enclosure';
import AccountNavigation from './AccountNavigation';

const ProfilePage = props => (
  <Enclosure className="container margin-bottom-lg">
    <h1 className="league-gothic-lg caps-lock">
      Welcome, {props.user.firstName}!
    </h1>
    <AccountNavigation {...props} />;
  </Enclosure>
);

export default ProfilePage;
