import React, { useState } from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';

import FilterSubNav from './FilterSubNav';
import Modal from '../../../utilities/Modal/Modal';
// import staticCauses from '../CampaignFilters/CauseVariables';
import MenuButton from '../../../utilities/MenuButton/MenuButton';
import staticCauses from '../CampaignFilters/CauseFilter/CauseVariables';

const FilterNavigation = ({ causes, setCauses }) => {
  const [chosenFilter, setChosenFilter] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleCauseSelect = event => {
    staticCauses[event.target.value].checked = !staticCauses[event.target.value]
      .checked;
    if (causes.includes(event.target.value)) {
      const newCauses = causes.filter(cause => {
        return cause !== event.target.value;
      });
      setCauses([...newCauses]);
    } else {
      setCauses([...causes, event.target.value]);
    }
  };

  const clearAllSelected = () => {
    causes.forEach(cause => {
      staticCauses[cause].checked = !staticCauses[cause].checked;
    });
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
    <div className="campaigns-page-filters w-full pl-6 md:pl-0 mb-6 z-50 lg:relative">
      <>
        <MenuButton
          title="Causes"
          onClick={handleMenuToggle}
          toggleCarat={showFilterMenu}
          className={
            showFilterMenu
              ? 'bg-white border-none shadow-lg rounded-b-none'
              : ''
          }
        />
      </>
      <>
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
                    clearAll={clearAllSelected}
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
                        clearAll={clearAllSelected}
                        handleCauseSelect={handleCauseSelect}
                        handleMenuToggle={handleMenuToggle}
                        showFilterMenu={showFilterMenu}
                        chosenFilter={chosenFilter}
                      />
                    </Modal>
                  ) : null}
                </>
              )}
            </>
          )}
        </Media>
      </>
    </div>
  );
};

FilterNavigation.propTypes = {
  causes: PropTypes.instanceOf(Array).isRequired,
  setCauses: PropTypes.func.isRequired,
};

export default FilterNavigation;
