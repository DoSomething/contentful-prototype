import React from 'react';

const GotvBlock = () => (
  <>
    <div className="md:bg-blurple-500 grid-wide md:p-6">
      <div className="bg-white border border-solid border-gray-300 p-3 rounded md:rounded-none">
        <h1 className="text-base uppercase">Your Friends</h1>

        <form>
          <input
            className="border border-dashed rounded border-gray-600 p-3"
            type="text"
            placeholder="Friend's First Name"
          />
        </form>

        <h1 className="text-base uppercase">Voter Resources</h1>
        <div className="w-full">
          <div className="md:w-1/2 bg-blurple-300 p-6">
            <div className="bg-white bg-opacity-25 border border-solid border-gray-300">
              “Hey! Election Day (Tuesday, Nov. 3) is coming up soon, so I
              wanted to reach out and ask if you’re planning to vote in-person
              or by mail?”
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default GotvBlock;
