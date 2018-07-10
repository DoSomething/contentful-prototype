import React from 'react';

import AccountQuery from './AccountQuery';
import Enclosure from '../../Enclosure';

const ProfilePage = props => (
  <Enclosure className="">
    <AccountQuery {...props} />
  </Enclosure>
);

export default ProfilePage;
