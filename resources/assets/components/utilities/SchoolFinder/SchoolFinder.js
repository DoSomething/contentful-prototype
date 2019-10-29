import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import TextContent from '../TextContent/TextContent';

const SchoolFinder = ({ campaignId, userId }) => {
  console.log(campaignId, userId);

  return (
    <div className="margin-bottom-lg margin-horizontal-md clear-both primary">
      <Card title="Find Your School" className="rounded bordered">
        <TextContent className="padded">Testing</TextContent>
      </Card>
    </div>
  );
};

SchoolFinder.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SchoolFinder;
