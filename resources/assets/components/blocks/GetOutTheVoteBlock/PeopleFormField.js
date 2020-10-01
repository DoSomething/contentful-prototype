import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { get, set } from '../../../helpers/storage';

const PeopleFormField = ({ row }) => {
  const friend = get(`VotingMethodInfo_${row}`, 'object');
  const nameValue = friend ? friend.name : '';
  const [friendName, setFriendName] = useState(nameValue);
  const handleNameChange = event => {
    setFriendName(event.target.value);
    set(`VotingMethodInfo_${row}`, 'object', {
      name: event.target.value,
    });
  };
  const handleMethodClick = event => {
    set(`VotingMethodInfo_${row}`, 'object', {
      votingMethod: event.target.value,
    });
  };
  return (
    <div
      className={classnames('md:flex md:items-center md:pb-6', {
        'border-b border-gray-400 border-solid': row < 3,
        'pt-6 md:py-6': row > 1,
      })}
    >
      <div className="md:w-2/5">
        <input
          className="w-full border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
          value={friendName}
          onChange={handleNameChange}
        />
      </div>

      <div className="w-full md:w-3/5 flex justify-around py-6 md:py-0">
        <label htmlFor={`voting-method-${row}`}>
          <input
            className="mr-2 md:mr-4"
            name={`voting-method-${row}`}
            value="in-person"
            type="radio"
            aria-label="voting-method"
            onClick={handleMethodClick}
          />
          Voting in-person
        </label>

        <label htmlFor={`voting-method-${row}`}>
          <input
            className="mr-2 md:mr-4"
            name={`voting-method-${row}`}
            value="mail"
            type="radio"
            aria-label="voting-method"
            onClick={handleMethodClick}
          />
          Voting by Mail
        </label>
      </div>
    </div>
  );
};

PeopleFormField.propTypes = {
  row: PropTypes.number.isRequired,
};

export default PeopleFormField;
