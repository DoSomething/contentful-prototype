import React from 'react';

const WhoAreYourPeopleForm = () => (
  <form className="py-6">
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

        <input
          id="voting-location-friend-1"
          type="checkbox"
          aria-label="voting-location"
        />

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>

    <div className="md:flex md:items-center md:py-6 border-b border-gray-400 border-solid pt-6">
      <div className="md:w-2/5">
        <input
          className="w-full border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-full md:w-3/5 flex justify-around py-6 md:py-0">
        <p className="w-1/3">Voting in-person</p>

        <input
          id="voting-location-friend-2"
          type="checkbox"
          aria-label="voting-location"
        />

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>

    <div className="md:flex md:items-center pt-6">
      <div className="md:w-2/5">
        <input
          className="w-full border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-full md:w-3/5 flex justify-around py-6 md:py-0">
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
