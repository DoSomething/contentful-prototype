import React from 'react';
import PropTypes from 'prop-types';

import FormItem from './FormItem';
import { env } from '../../../helpers/index';
// import VoterRegStatusBlock from './VoterRegStatusBlock';

const login = '/login';

const Profile = props => (
  <div className="bg-gray padding-bottom-lg wrapper">
    <h2 className="caps-lock league-gothic -sm">Your Profile</h2>
    <div className="margin-top-lg float-left">
      <h3>Profile Info</h3>

      <FormItem title="Name" value={props.user.firstName} />
      <FormItem title="Birthday" value={props.user.birthdate} />
      <FormItem
        title="Password"
        value="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
      />
      <FormItem title="Email" value={props.user.email} />
      <FormItem title="Phone Number" value={props.user.mobile} />
      <div className="margin-top-lg">
        <a
          href={env('NORTHSTAR_URL') + login}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Edit Profile
        </a>
      </div>
    </div>

    {/* Commenting this out until we have proper Voter registration info being pulled from Rogue.
      <div className="float-right clear-right padding-top-md">
        <h2>Registration Status</h2>
        <div className="margin-top-lg">
          <VoterRegStatusBlock status={props.user.voterRegistrationStatus} />
        </div>
      </div>
    */}
  </div>
);

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    birthdate: PropTypes.string,
    voterRegistrationStatus: PropTypes.string,
  }).isRequired,
};

export default Profile;
