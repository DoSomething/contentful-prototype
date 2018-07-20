import React from 'react';

import Enclosure from '../../Enclosure';

import AccountQueryContainer from './AccountQueryContainer';

const ProfilePage = props => (
  <Enclosure className="container margin-bottom-lg">
    <AccountQueryContainer {...props} />
  </Enclosure>
);

export default ProfilePage;
