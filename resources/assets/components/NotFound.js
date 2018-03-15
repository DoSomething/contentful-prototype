import React from 'react';

import Card from '../components/Card';
import Markdown from '../components/Markdown';

const zendeskUrl = 'https://help.dosomething.org/hc/en-us/articles/115016093488-Help-The-page-I-m-looking-for-says-Page-Not-Found-';

const NotFound = () => (
  <Card title="Not Found" className="rounded bordered">
    <Markdown className="padded">
      __We searched our site, but couldn&apos;t find what you were looking for.__
      Try [Grab the Mic](/us/campaigns/grab-mic?utm_source=404) and join our movement
      to create the most civically active generation ever.

      You can also try [our homepage](/) or [reach out]({zendeskUrl}) to us.
    </Markdown>
  </Card>
);

export default NotFound;
