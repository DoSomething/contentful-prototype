import React from 'react'; //npm files

import Enclosure from '../../Enclosure'; //files from app
import Card from '../../utilities/Card/Card';

//css imports go here

const ProfilePage = () => {
  // const {} = props;
  console.log('shhhhhhh');

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
