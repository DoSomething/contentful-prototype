import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { UsaStates } from 'usa-states';

import Card from '../Card/Card';
import TextContent from '../TextContent/TextContent';

import './school-finder.scss';

const stateOptions = new UsaStates().states.map(state => ({
  value: state.abbreviation,
  label: state.name,
}));

const SchoolFinder = ({ campaignId, userId }) => {
  if (campaignId !== '9001') {
    return null;
  }

  console.log(userId);

  return (
    <div className="school-finder margin-bottom-lg margin-horizontal-md clear-both primary">
      <Card title="Find Your School" className="rounded bordered">
        <TextContent className="padded">
          Pick your school and whatever. Invite your classmates to join this
          campaign and donate their jeans to win prizes and some other stuff.
        </TextContent>
        <div className="select-state padded">
          <strong>State</strong>
          <Select options={stateOptions} />
        </div>
      </Card>
    </div>
  );
};

SchoolFinder.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SchoolFinder;
