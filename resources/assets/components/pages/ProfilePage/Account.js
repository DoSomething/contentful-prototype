import React from 'react';
import PropTypes from 'prop-types';

const Account = props => (
  <div>
    <h1> Your Account </h1>
    <div className="margin-top-lg">
      <h5>Name</h5>
      <div className="margin-top-md">
        <p> {props.user.firstName} </p>
      </div>
    </div>
    <div className="margin-top-lg">
      <h5>Birthday</h5>
      <div className="margin-top-md">
        <p> {props.user.birthdate} </p>
      </div>
    </div>
    <div className="margin-top-lg">
      <h5>Password</h5>
      <div className="margin-top-md">
        <p>&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;</p>
      </div>
    </div>
    <div className="margin-top-lg">
      <h5>Email</h5>
      <div className="margin-top-md">
        <p>{props.user.email}</p>
      </div>
    </div>
    <div className="margin-top-lg">
      <h5>Phone Number</h5>
      <div className="margin-top-md">
        <p>{props.user.mobile}</p>
      </div>
    </div>
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
