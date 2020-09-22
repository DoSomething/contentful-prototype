import React from 'react';

const WhoAreYourPeopleForm = () => (
  <form>
    <div className="flex">
      <div className="w-1/3">
        <input
          className="border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-2/3 flex">
        <p className="w-1/3">Voting in-person</p>

        <label className="w-1/3" htmlFor="voting-location">
          <input id="voting-location" type="checkbox" />
        </label>

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>

    <div className="flex">
      <div className="w-1/3">
        <input
          className="border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-2/3 flex">
        <p className="w-1/3">Voting in-person</p>

        <label className="w-1/3" htmlFor="voting-location">
          <input id="voting-location" type="checkbox" />
        </label>

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>

    <div className="flex">
      <div className="w-1/3">
        <input
          className="border border-dashed rounded border-gray-600 p-3"
          type="text"
          placeholder="Friend's First Name"
        />
      </div>

      <div className="w-2/3 flex">
        <p className="w-1/3">Voting in-person</p>

        <label className="w-1/3" htmlFor="voting-location">
          <input id="voting-location" type="checkbox" />
        </label>

        <p className="w-1/3">Voting by mail</p>
      </div>
    </div>
  </form>
);

export default WhoAreYourPeopleForm;
