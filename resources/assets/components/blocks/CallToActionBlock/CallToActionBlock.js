import React from 'react';

const CallToActionBlock = () => {
  return (
    <div className="wrapper bg-purple-700">
      <div className="base-12-grid">
        <div className="grid-narrow text-center my-4">
          <h3 className="text-4xl font-league-gothic text-yellow-500 font-bold uppercase">
            Voter Registration Capabilities
          </h3>
          <p className="text-white pb-4">
            These tools are designed with the ability to be customized for you--
            we can rapidly spin up impactful, branded pages to get your audience
            registered to vote.
          </p>
          <a
            className="btn mx-4 bg-blurple-500 text-white hover:bg-blurple-300 hover:text-white"
            href="https://google.com"
          >
            Button text
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToActionBlock;
