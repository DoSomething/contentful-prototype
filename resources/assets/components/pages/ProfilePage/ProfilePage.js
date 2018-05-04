import React from 'react';

import Enclosure from '../../Enclosure';
import Card from '../../utilities/Card/Card';

const ProfilePage = () => {
  return (
    <div className="main clearfix">
      <Enclosure className="default-container margin-top-lg margin-bottom-lg">
        <h1>Hey, it's your profile!</h1>
        <Card className="bordered rounded" title="My Campaigns">
          <div className="padded">My campaigns will be here!</div>
        </Card>
      </Enclosure>
    </div>
  );
};

export default ProfilePage;
