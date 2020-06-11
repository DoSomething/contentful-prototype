import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const StatBlock = ({ label, amount }) => (
  <div className="pt-3">
    <span className="font-bold uppercase text-gray-600">{label}</span>
    <h1 className="font-normal font-league-gothic text-3xl">{amount}</h1>
  </div>
);

const GroupTemplate = ({ group }) => {
  return (
    <>
      <SectionHeader title={`${group.groupType.name}: ${group.name}`} />
      <p>Track how many people you and your group register to vote!</p>
      <StatBlock
        label="Your Group's Registration Goal"
        amount={group.goal || 50}
      />
    </>
  );
};

GroupTemplate.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupTemplate;
