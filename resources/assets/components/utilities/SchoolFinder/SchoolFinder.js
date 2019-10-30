import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Card from '../Card/Card';
import TextContent from '../TextContent/TextContent';

const colourOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const SchoolFinder = ({ campaignId, userId }) => {
  if (campaignId !== '9001') {
    return null;
  }

  console.log(userId);

  return (
    <div className="margin-bottom-lg margin-horizontal-md clear-both primary">
      <Card title="Find Your School" className="rounded bordered">
        <TextContent className="padded">Testing</TextContent>
        <Select options={colourOptions} />
      </Card>
    </div>
  );
};

SchoolFinder.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SchoolFinder;
