import React from 'react';

import DismissableElement from '../DismissableElement/DismissableElement';

const SitewideCtaBanner = () => (
  <DismissableElement
    name="sitewide_banner_voter_registration"
    context={{ contextSource: 'voter_registration' }}
    render={(handleClose, handleComplete) => (
      <div className="w-full flex justify-center bg-yellow-500 p-4 fixed z-50">
        <button type="button" className="modal__close" onClick={handleClose}>
          &times;
        </button>
        <p className="pb-2 md:pr-4 md:pb-0 align-middle">
          Make your voice heard. Register to vote in less than 2 minutes.
        </p>
        <a
          className="py-2 px-4 border border-solid-blurple rounded-md bg-blurple-500 text-white uppercase"
          href="https://vote.dosomething.org/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleComplete}
        >
          Get Started
        </a>
      </div>
    )}
  />
);

export default SitewideCtaBanner;
