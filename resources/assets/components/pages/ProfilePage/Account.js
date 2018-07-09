import React from 'react';

import Button from '../../utilities/Button/Button';
// import AccountQuery from '../../AccountQuery';

const Account = props => (
  <div>
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
        href="https://identity-qa.dosomething.org" //profile.dosomething.org for prod
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
