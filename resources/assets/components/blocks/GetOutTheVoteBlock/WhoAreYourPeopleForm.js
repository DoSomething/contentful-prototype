import React from 'react';

import FriendOne from './PeopleFormFields/FriendOne';
import FriendTwo from './PeopleFormFields/FriendTwo';
import FriendThree from './PeopleFormFields/FriendThree';

const WhoAreYourPeopleForm = () => {
  return (
    <form className="py-6">
      <FriendOne />

      <FriendTwo />

      <FriendThree />
    </form>
  );
};

export default WhoAreYourPeopleForm;
