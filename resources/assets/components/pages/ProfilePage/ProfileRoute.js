import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Account from './Account';
import TestCampaign from './TestCampaign';

const ProfileRoute = props => (
  <div>
    <Switch>
      <Route path="/us/profile/info" render={() => <Account {...props} />} />
      <Route path="/us/profile/campaigns" component={TestCampaign} />
    </Switch>
  </div>
);

export default ProfileRoute;
