import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import ProfileNavigation from './ProfileNavigation';
import ProfileRoute from './ProfileRoute';

const ProfilePage = props => (
  <Enclosure className="container margin-bottom-lg ">
    <div className="container bg-white padding-top-lg padding-horizontal-md">
      <div className="wrapper padding-bottom-lg">
        <h1 className="league-gothic-lg caps-lock">
          Welcome, {props.user.firstName}!
        </h1>
        <ProfileNavigation {...props} />
      </div>
    </div>

    <div className="container bg-gray margin-top-lg padding-horizontal-md">
      <div className="wrapper bg-gray">
        <ProfileRoute {...props} />
      </div>
    </div>
  </Enclosure>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default ProfilePage;
