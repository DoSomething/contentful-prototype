import React from 'react';

const WhoAreYourPeopleForm = () => (
  <form className="py-6">
    <div className="md:flex border-b border-gray-400 border-solid">
      <div className="md:w-1/3">
        <input
          className="w-full border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-full md:w-2/3 flex justify-around py-6">
        <p className="w-1/3">Voting in-person</p>

        <input
          id="voting-location-friend-1"
          type="checkbox"
          aria-label="voting-location"
        />

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>

    <div className="md:flex border-b border-gray-400 border-solid pt-6">
      <div className="md:w-1/3">
        <input
          className="w-full border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-full md:w-2/3 flex justify-around py-6">
        <p className="w-1/3">Voting in-person</p>

        <input
          id="voting-location-friend-2"
          type="checkbox"
          aria-label="voting-location"
        />

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>

    <div className="md:flex pt-6">
      <div className="md:w-1/3">
        <input
          className="w-full border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-full md:w-2/3 flex justify-around py-6">
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
