import React from 'react';
import PropTypes from 'prop-types';

import FormItem from './FormItem';

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
        href="https://identity-qa.dosomething.org" // profile.dosomething.org for prod, should there be a redirect once profile is edited?
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="button" type="button">
          Edit Profile
        </button>
      </a>
    </div>
  </div>
);

export default Account;

Account.propTypes = {
  user: {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
  },
};

Account.defaultProps = {
  user: PropTypes.object,
};
