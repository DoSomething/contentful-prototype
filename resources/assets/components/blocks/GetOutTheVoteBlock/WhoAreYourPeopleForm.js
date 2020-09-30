import React from 'react';

import PeopleFormField from './PeopleFormFields/PeopleFormField';

const WhoAreYourPeopleForm = () => {
  return (
    <form className="py-6">
      {[0, 1, 2].map(index => (
        <PeopleFormField key={index} row={index + 1} />
      ))}
    </form>
  );
};

export default WhoAreYourPeopleForm;
