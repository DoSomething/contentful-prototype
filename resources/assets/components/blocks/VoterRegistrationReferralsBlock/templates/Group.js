import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const GroupTemplate = ({ group }) => {
  return (
    <>
      <SectionHeader title={`${group.groupType.name}: ${group.name}`} />
      <p>Track how many people you and your group register to vote!</p>
    </>
  );
};

GroupTemplate.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupTemplate;
