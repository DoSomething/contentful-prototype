import React, { useState } from 'react';

const FriendThree = () => {
  const [voterChoiceFriendThree, setvoterChoiceFriendThree] = useState('');

  const handleVotingChoiceFriendThree = event => {
    if (event.target.id === 'voting-location-friend-3-in-person') {
      setvoterChoiceFriendThree('in-person');
    } else {
      setvoterChoiceFriendThree('mail');
    }
  };

  return (
    <div className="md:flex md:items-center pt-6">
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
            name="in-person"
            type="radio"
            aria-label="voting-location"
            onClick={handleVotingChoiceFriendThree}
            checked={voterChoiceFriendThree === 'in-person'}
          />
          Voting in-person
        </label>
        <label htmlFor="voting-location-friend-2-by-mail">
          <input
            id="voting-location-friend-2-by-mail"
            className="mr-2 md:mr-4"
            name="mail"
            type="radio"
            aria-label="voting-location"
            onClick={handleVotingChoiceFriendThree}
            checked={voterChoiceFriendThree === 'mail'}
          />
          Voting by Mail
        </label>
      </div>
    </div>
  );
};

export default FriendThree;
