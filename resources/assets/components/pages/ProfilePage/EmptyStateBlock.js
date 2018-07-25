import React from 'react';

const EmptyStateBlock = () => (
  <div className="margin-top-md margin-bottom-lg">
    <p>
      You {"don't"} have any uploads...yet! Find a cause you care about <br />and
      get started today!
    </p>
    <div className="margin-top-lg">
      <a
        href="/us/campaigns"
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        Find a Campaign!
      </a>
    </div>
  </div>
);
export default EmptyStateBlock;
