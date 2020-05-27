import React from 'react';

import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const ReferFriendsTab = () => (
  <div className="col-span-4 md:col-span-8 lg:col-start-2 lg:col-span-7 xxl:col-start-2 xxl:col-span-6">
    <SectionHeader underlined title="Enter to Win A $10 Gift Card" />

    <SocialDriveActionContainer
      shareCardTitle="Refer a friend"
      shareCardDescription="When your friend signs up for their first DoSomething campaign, you’ll both enter to win a $10 gift card! Every 2 weeks, there will be 25 winners. The more friends you refer, the more chances you have to win. (Psst...there’s no limit on how many you can refer!)"
      /* @TODO use refer-friends link generator helper once we establish a default campaign in https://bit.ly/3c9L7nT */
      link="https://dosomething.org/us/campaigns/senior-homies"
      fullWidth
    />
  </div>
);

export default ReferFriendsTab;
