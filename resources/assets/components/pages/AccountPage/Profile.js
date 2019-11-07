import React from 'react';
import PropTypes from 'prop-types';

import FormItem from './FormItem';
import { env } from '../../../helpers/index';
// import VoterRegStatusBlock from './VoterRegStatusBlock';

const Profile = props => (
  <React.Fragment>
    <div className="grid-wide-2/3">
      <h3>Profile Info</h3>

      <FormItem
        title="Name"
        value={`${props.user.firstName} ${props.user.lastName}`}
      />
      <FormItem title="Birthday" value={props.user.birthdate} />
      <FormItem
        title="Password"
        value="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
      />
      <FormItem title="Email" value={props.user.email} />
      <FormItem title="Phone Number" value={props.user.mobile} />
      <div className="margin-top-lg">
        <a
          href={`${env('NORTHSTAR_URL')}/users/${props.user.id}/edit`}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Edit Profile
        </a>
      </div>
    </div>
    <div className="grid-wide-1/3">
      <h3>Data and Privacy</h3>
      <ul className="mt-8">
        <li>
          <a
            href="mailto:trust@dosomething.org?subject=Delete my account"
            className="secondary"
          >
            Delete my account
          </a>
        </li>
      </ul>
    </div>
    {/* Commenting this out until we have proper Voter registration info being pulled from Rogue.
      <div className="float-right clear-right padding-top-md">
        <h2>Registration Status</h2>
        <div className="margin-top-lg">
          <VoterRegStatusBlock status={props.user.voterRegistrationStatus} />
        </div>
      </div>
    */}
  </React.Fragment>
);

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    birthdate: PropTypes.string,
    voterRegistrationStatus: PropTypes.string,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
