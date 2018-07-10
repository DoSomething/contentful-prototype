import React from 'react';

import AccountQuery from './AccountQuery';
import Enclosure from '../../Enclosure';

const ProfilePage = props => (
  <Enclosure className="container">
    <AccountQuery {...props} />
  </Enclosure>
);

export default ProfilePage;
