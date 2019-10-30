import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { UsaStates } from 'usa-states';

import Card from '../Card/Card';
import Button from '../Button/Button';
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

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [submittedForm, setSubmittedForm] = useState(false);

  function fetchSchools(searchString, callback) {
    if (searchString.length < 2) {
      return Promise.resolve();
    }

    // @TODO: Handle errors.
    return fetch(
      `https://lofischools.herokuapp.com/search?state=${selectedState}&query=${searchString}`,
    )
      .then(res => res.json())
      .then(res => callback(res.results));
  }

  if (submittedForm) {
    return (
      <div className="school-finder margin-bottom-lg margin-horizontal-md clear-both primary">
        <Card title="Your School" className="rounded bordered">
          <div className="padded">
            <p>
              Something something something school finder post verification
              copy. You can email{' '}
              <a href="mailto:Sahara@DoSomething.org">
                mailto:Sahara@DoSomething.org
              </a>{' '}
              to change your school.
            </p>
            <h3>{selectedSchool.name}</h3>
            <small className="uppercase">
              {selectedSchool.city}, {selectedSchool.state}
            </small>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="school-finder margin-bottom-lg margin-horizontal-md clear-both primary">
      <Card title="Find Your School" className="rounded bordered">
        <TextContent className="padded">
          Pick your school and whatever. Invite your classmates to join this
          campaign and donate their jeans to win prizes and some other stuff.
        </TextContent>
        <div className="select-state padded">
          <strong>State</strong>
          <Select
            options={stateOptions}
            onChange={selected => setSelectedState(selected.value)}
          />
        </div>
        {selectedState ? (
          <div className="select-school padded">
            <AsyncSelect
              defaultOptions
              getOptionLabel={school =>
                `${school.name} - ${school.city}, ${school.state}`
              }
              getOptionValue={school => school.id}
              loadOptions={fetchSchools}
              placeholder="Enter your school name"
              onChange={selected => setSelectedSchool(selected)}
            />
          </div>
        ) : null}
        <Button
          onClick={() => setSubmittedForm(true)}
          disabled={selectedSchool === null}
          attached
        >
          Submit
        </Button>
      </Card>
    </div>
  );
};

SchoolFinder.propTypes = {
  campaignId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SchoolFinder;
