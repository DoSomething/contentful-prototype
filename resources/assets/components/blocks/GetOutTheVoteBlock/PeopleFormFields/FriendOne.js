import React, { useState } from 'react';

const FriendOne = () => {
  const [voterChoiceFriendOne, setvoterChoiceFriendOne] = useState('');

  const handleVotingChoiceFriendOne = event => {
    if (event.target.id === 'voting-location-friend-1-in-person') {
      setvoterChoiceFriendOne('in-person');
    } else {
      setvoterChoiceFriendOne('by-mail');
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
        <p className="w-1/3">Voting in-person</p>
        <div className="w-1/3 bg-blurple-500 flex justify-around rounded-full">
          <input
            id="voting-location-friend-1-in-person"
            type="radio"
            aria-label="voting-location"
            onClick={handleVotingChoiceFriendOne}
            checked={voterChoiceFriendOne === 'in-person'}
          />
          <input
            id="voting-location-friend-1"
            type="radio"
            aria-label="voting-location"
            checked={!voterChoiceFriendOne}
            disabled
          />
          <input
            id="voting-location-friend-1-by-mail"
            type="radio"
            aria-label="voting-location"
            onClick={handleVotingChoiceFriendOne}
            checked={voterChoiceFriendOne === 'by-mail'}
          />
        </div>

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>
  );
};

export default FriendOne;
