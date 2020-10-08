import React from 'react';
import { css } from '@emotion/core';

import Embed from '../../utilities/Embed/Embed';
import PeopleFormField from './PeopleFormField';
import starterTextBackground from './VoteExplosion.png';

const GetOutTheVoteBlock = () => (
  <div className="md:bg-blurple-500 grid-wide py-6 my-6 md:p-6">
    <div className="bg-white border border-solid border-gray-300 px-5 py-6 rounded md:rounded-none">
      <h2 className="text-base uppercase">Your Friends</h2>

      <p className="text-sm">
        (Don’t worry, we don’t save any info about your friends)
      </p>

      <form className="py-6">
        {[0, 1, 2].map(index => (
          <PeopleFormField key={index} row={index + 1} />
        ))}
      </form>

      <h2 className="text-base uppercase">Voter Resources</h2>

      <p className="text-sm">
        Resource links & conversation starters to get the dialog flowing!
      </p>

      <div className="lg:flex py-6">
        <div
          css={css`
            background-image: url(${starterTextBackground});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          `}
          className="lg:w-1/2 p-6 mb-6 md:mb-0 md:mr-3 flex items-center"
        >
          <div className="bg-white bg-opacity-25 border border-solid border-gray-300 p-3">
            <h3 className="italic text-base">Conversation Starters</h3>
            “Hey! Election Day (Tuesday, Nov. 3) is coming up soon, so I wanted
            to reach out and ask if you’re planning to vote in-person or by
            mail?”
          </div>
        </div>

        <div className="lg:w-1/2">
          <Embed
            className="mb-6"
            url="https://www.dosomething.org/us/stories/absentee"
          />
          <Embed url="https://www.vote.org/polling-place-locator/" />
        </div>
      </div>
    </div>
  </div>
);

export default GetOutTheVoteBlock;
