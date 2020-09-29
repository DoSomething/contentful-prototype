import React, { useState } from 'react';

const FriendTwo = () => {
  const [voterChoiceFriendTwo, setvoterChoiceFriendTwo] = useState('');

  const handleVotingChoiceFriendTwo = event => {
    if (event.target.id === 'voting-location-friend-2-in-person') {
      setvoterChoiceFriendTwo('in-person');
    } else {
      setvoterChoiceFriendTwo('mail');
    }
  };

  return (
    <div className="md:flex md:items-center md:py-6 border-b border-gray-400 border-solid pt-6">
      <div className="md:w-2/5">
        <input
          className="w-full border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-full md:w-3/5 flex justify-around py-6 md:py-0">
        <label htmlFor="voting-location-friend-2-in-person">
          <input
            id="voting-location-friend-2-in-person"
            className="mr-2 md:mr-4"
            name="in-person-2"
            type="radio"
            aria-label="voting-location"
            onClick={handleVotingChoiceFriendTwo}
            checked={voterChoiceFriendTwo === 'in-person'}
          />
          Voting in-person
        </label>
        <label htmlFor="voting-location-friend-2-by-mail">
          <input
            id="voting-location-friend-2-by-mail"
            className="mr-2 md:mr-4"
            name="mail-2"
            type="radio"
            aria-label="voting-location"
            onClick={handleVotingChoiceFriendTwo}
            checked={voterChoiceFriendTwo === 'mail'}
          />
          Voting by Mail
        </label>
      </div>
    </div>
  );
};

export default FriendTwo;
