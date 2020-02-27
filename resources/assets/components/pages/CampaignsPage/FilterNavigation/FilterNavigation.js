import React, { useState } from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';

import FilterSubNav from './FilterSubNav';
import Modal from '../../../utilities/Modal/Modal';
import MenuButton from '../../../utilities/MenuButton/MenuButton';

const FilterNavigation = ({ causes, setCauses }) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [chosenFilter, setChosenFilter] = useState('');

  const handleCauseSelect = event => {
    if (causes.includes(event.target.value)) {
      const newCauses = causes.filter(cause => {
        return cause !== event.target.value;
      });
      setCauses([...newCauses]);
    } else {
      setCauses([...causes, event.target.value]);
    }
  };

  const clearAll = () => {
    // causes.forEach(cause => {
    //   where name === cause
    //     if cause.checked === true then set to false

    // })
    if (causes) {
      setCauses([]);
    }
  };

  const handleMenuToggle = filterName => {
    if (chosenFilter) {
      setChosenFilter('');
    } else {
      setChosenFilter(filterName);
    }
    setShowFilterMenu(!showFilterMenu);
  };

  return (
    <div className="pl-6 md:pl-0 mb-6">
      <MenuButton
        title="Causes"
        onClick={handleMenuToggle}
        toggleCarat={showFilterMenu}
      />
      <Media
        queries={{
          large: '(min-width: 960px)',
        }}
      >
        {matches => (
          <>
            {matches.large ? (
              <>
                <FilterSubNav
                  clearAll={clearAll}
                  handleCauseSelect={handleCauseSelect}
                  handleMenuToggle={handleMenuToggle}
                  showFilterMenu={showFilterMenu}
                  chosenFilter={chosenFilter}
                />
              </>
            ) : (
              <>
                {showFilterMenu ? (
                  <Modal onClose={() => handleMenuToggle()}>
                    <FilterSubNav
                      clearAll={clearAll}
                      handleCauseSelect={handleCauseSelect}
                      handleMenuToggle={handleMenuToggle}
                      showFilterMenu={showFilterMenu}
                    />
                  </Modal>
                ) : null}
              </>
            )}
          </>
        )}
      </Media>
    </div>
  );
};

FilterNavigation.propTypes = {
  causes: PropTypes.instanceOf(Array).isRequired,
  setCauses: PropTypes.func.isRequired,
};

export default FilterNavigation;
