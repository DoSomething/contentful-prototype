import React, { useState } from 'react';

const FriendOne = () => {
  const [voterChoiceFriendOne, setVoterChoiceFriendOne] = useState('');

  const handleVotingChoiceFriendOne = event => {
    if (event.target.id === 'voting-location-friend-1-in-person') {
      setVoterChoiceFriendOne('in-person');
    } else {
      setVoterChoiceFriendOne('mail');
    }
  };

  return (
    <div className="md:flex md:items-center md:pb-6 border-b border-gray-400 border-solid">
      <div className="md:w-2/5">
        <input
          className="w-full border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-full md:w-3/5 flex justify-around py-6 md:py-0">
        <label htmlFor="voting-location-friend-1-in-person">
          <input
            id="voting-location-friend-1-in-person"
            className="mr-2 md:mr-4"
            name="in-person-1"
            type="radio"
            aria-label="voting-location"
            onClick={handleVotingChoiceFriendOne}
            checked={voterChoiceFriendOne === 'in-person'}
          />
          Voting in-person
        </label>
        <label htmlFor="voting-location-friend-1-by-mail">
          <input
            id="voting-location-friend-1-by-mail"
            className="mr-2 md:mr-4"
            name="mail-1"
            type="radio"
            aria-label="voting-location"
            onClick={handleVotingChoiceFriendOne}
            checked={voterChoiceFriendOne === 'mail'}
          />
          Voting by Mail
        </label>
      </div>
    </div>
  );
};

export default FriendOne;
