import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import Button from '../Button/Button';
import SchoolSelect from './SchoolSelect';
import SchoolStateSelect from '../UsaStateSelect';

const SchoolFinder = ({ campaignId }) => {
  // Check for our development Teens For Jeans (TFJ) campaign ID.
  // @TODO: Add additional check for production TFJ campaign ID once it exists.
  if (campaignId !== '9001') {
    return null;
  }

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedSchoolState, setSelectedSchoolState] = useState(null);
  const [submittedForm, setSubmittedForm] = useState(false);

  // @TODO: Also display this content when user already has a school_id on their profile.
  if (submittedForm) {
    return (
      <div className="school-finder margin-bottom-lg margin-horizontal-md clear-both primary">
        <Card title="Your School" className="rounded bordered overflow-visible">
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
      <Card
        title="Find Your School"
        className="rounded bordered overflow-visible"
      >
        <p className="padded">
          Pick your school and whatever. Invite your classmates to join this
          campaign and donate their jeans to win prizes and some other stuff.
        </p>
        <div className="select-state padded">
          <strong>State</strong>
          <SchoolStateSelect
            onChange={selected => setSelectedSchoolState(selected)}
          />
        </div>
        {selectedSchoolState ? (
          <div className="select-school padded">
            <SchoolSelect
              onChange={selected => setSelectedSchool(selected)}
              filterByState={selectedSchoolState.abbreviation}
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
