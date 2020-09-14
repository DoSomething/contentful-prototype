import React, { useEffect } from 'react';

const VoterWidgetBlock = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://app.customer.civicengine.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <h1>test</h1>
      <div className="civicengine-address" />
    </>
  );
};

export default VoterWidgetBlock;
