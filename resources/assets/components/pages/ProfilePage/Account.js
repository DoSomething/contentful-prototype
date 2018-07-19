import React from 'react';
import PropTypes from 'prop-types';

import FormItem from './FormItem';
import { env } from '../../../helpers/index';

const login = '/login';
const Account = props => (
  <div className="bg-gray padding-bottom-lg wrapper">
    <h2 className="caps-lock league-gothic-sm">Your Account </h2>
    <div className="margin-top-lg">
      <h3>Account Info</h3>
    </div>
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
);

export default Account;

Account.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    birthdate: PropTypes.string,
  }).isRequired,
};
