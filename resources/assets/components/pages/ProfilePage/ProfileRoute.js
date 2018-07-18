import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AccountQuery from './AccountQuery';
import TestCampaign from './TestCampaign';

const ProfileRoute = () => (
  <div>
    <Switch>
      <Route path="/us/profile/info" component={AccountQuery} />

      <Route path="/us/profile/campaigns" component={TestCampaign} />
    </Switch>
  </div>
);

export default ProfileRoute;
