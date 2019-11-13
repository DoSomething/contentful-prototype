import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from './utilities/Card/Card';
import TextContent from './utilities/TextContent/TextContent';

const zendeskUrl =
  'https://help.dosomething.org/hc/en-us/articles/115016093488-Help-The-page-I-m-looking-for-says-Page-Not-Found-';

const NotFound = props => (
  <Card
    title="Not Found"
    className={classnames('rounded bordered', props.className)}
  >
    <TextContent className="padded">
      __We searched our site, but couldn&apos;t find what you were looking
      for.__ Find ways you can [Take Action](/us/campaigns?utm_source=404) and
      join a movement of 5 million young people making an impact in their
      communities. You can also try [our homepage](/) or [reach out](
      {zendeskUrl}) to us.
    </TextContent>
  </Card>
);

NotFound.propTypes = {
  className: PropTypes.string,
};

NotFound.defaultProps = {
  className: null,
};

export default NotFound;
