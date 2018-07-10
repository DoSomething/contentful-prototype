import React from 'react';

import AccountQuery from './AccountQuery';
import Enclosure from '../../Enclosure';

const ProfilePage = props => (
  <Enclosure className="container bg-white padding-top-lg">
    <AccountQuery {...props} />
  </Enclosure>
);

export default ProfilePage;
