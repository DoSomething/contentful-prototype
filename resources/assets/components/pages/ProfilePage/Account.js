import React from 'react';

import Button from '../../utilities/Button/Button';
import AccountQuery from '../../AccountQuery';

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
        <p> June 2 </p>
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
        <p>test@gmail.com</p>
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
        href="https://profile.dosomething.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="button" type="button">
          Edit Profile
        </Button>
      </a>
    </div>
  </div>
);

export default Account;
