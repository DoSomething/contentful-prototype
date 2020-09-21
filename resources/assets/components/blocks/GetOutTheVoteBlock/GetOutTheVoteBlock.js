import React from 'react';

import Embed from '../../utilities/Embed/Embed';
import WhoAreYourPeopleForm from './WhoAreYourPeopleForm';

const GetOutTheVoteBlock = () => {
  return (
    <>
      <div className="md:bg-blurple-500 grid-wide md:p-6">
        <div className="bg-white border border-solid border-gray-300 p-3 rounded md:rounded-none">
          <h2 className="text-base uppercase">Your Friends</h2>

          <p className="text-sm">
            (Don’t worry, we don’t save any info about your friends)
          </p>

          <WhoAreYourPeopleForm />

          <h2 className="text-base uppercase">Voter Resources</h2>

          <p className="text-sm">
            Resource links & conversation starters to get the dialog flowing!
          </p>

          <div className="flex">
            <div className="md:w-1/2 bg-blurple-500 p-6">
              <div className="bg-white bg-opacity-25 border border-solid border-gray-300 p-3">
                <h3 className="italic text-base">Conversation Starters</h3>
                “Hey! Election Day (Tuesday, Nov. 3) is coming up soon, so I
                wanted to reach out and ask if you’re planning to vote in-person
                or by mail?”
              </div>
            </div>

            <div className="md:w-1/2">
              <Embed url="https://www.dosomething.org/us/about/easy-scholarships" />
              <Embed url="https://www.dosomething.org/us/about/easy-scholarships" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetOutTheVoteBlock;
