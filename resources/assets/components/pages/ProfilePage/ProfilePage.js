import React from 'react';

import Enclosure from '../../Enclosure';
import AccountNavigation from './AccountNavigation';
import ProfileRoute from './ProfileRoute';

const ProfilePage = props => (
  <Enclosure className="container margin-bottom-lg">
    <div className="container bg-white padding-top-lg">
      <div className="wrapper padding-bottom-lg">
        <h1 className="league-gothic-lg caps-lock">
          Welcome, {props.user.firstName}!
        </h1>
        <AccountNavigation {...props} />
      </div>
    </div>

    <div className="container bg-gray margin-top-lg">
      <div className="wrapper bg-gray">
        <Enclosure className="">
          <ProfileRoute {...props} />
        </Enclosure>
      </div>
    </div>
  </Enclosure>
);

export default ProfilePage;
