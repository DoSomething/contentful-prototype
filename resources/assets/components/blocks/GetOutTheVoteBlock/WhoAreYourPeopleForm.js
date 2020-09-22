import React from 'react';

const WhoAreYourPeopleForm = () => (
  <form>
    <div className="md:flex">
      <div className="w-1/3">
        <input
          className="border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-2/3 flex">
        <p className="w-1/3">Voting in-person</p>

        <input
          id="voting-location-friend-1"
          type="checkbox"
          aria-label="voting-location"
        />

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>

    <div className="md:flex">
      <div className="w-1/3">
        <input
          className="border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-2/3 flex">
        <p className="w-1/3">Voting in-person</p>

        <input
          id="voting-location-friend-2"
          type="checkbox"
          aria-label="voting-location"
        />

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>

    <div className="md:flex">
      <div className="w-1/3">
        <input
          className="border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-2/3 flex">
        <p className="w-1/3">Voting in-person</p>

        <input
          id="voting-location-friend-3"
          type="checkbox"
          aria-label="voting-location"
        />

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>
  </form>
);

export default WhoAreYourPeopleForm;
