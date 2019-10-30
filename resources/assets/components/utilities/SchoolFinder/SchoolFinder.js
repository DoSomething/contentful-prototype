import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { UsaStates } from 'usa-states';

import Card from '../Card/Card';
import Button from '../Button/Button';

import './school-finder.scss';

const stateOptions = new UsaStates().states.map(state => ({
  value: state.abbreviation,
  label: state.name,
}));

const SchoolFinder = ({ campaignId }) => {
  // Check for our development Teens For Jeans (TFJ) campaign ID.
  // @TODO: Add additional check for production TFJ campaign ID once it exists.
  if (campaignId !== '9001') {
    return null;
  }

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [submittedForm, setSubmittedForm] = useState(false);

  function fetchSchools(searchString, callback) {
    // @TODO: Handle errors.
    return fetch(
      `https://lofischools.herokuapp.com/search?state=${selectedState}&query=${searchString}`,
    )
      .then(res => res.json())
      .then(res => callback(res.results));
  }

  // @TODO: Also display this content when user already has a school_id on their profile.
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
        <p className="padded">
          Pick your school and whatever. Invite your classmates to join this
          campaign and donate their jeans to win prizes and some other stuff.
        </p>
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
              noOptionsMessage={select =>
                select.inputValue.length > 1
                  ? `No results for "${select.inputValue}"`
                  : null
              }
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
  // @TODO: Add userId once we're ready to start reading/writing user's school_id.
};

export default SchoolFinder;
