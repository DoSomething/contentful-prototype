import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Modal from '../../utilities/Modal/Modal';
import MenuCarat from '../../artifacts/MenuCarat/MenuCarat';
import CampaignsFilters from './CampaignsFilters/CampaignsFilters';

const FilterNavigation = ({
  handleFilterToggle,
  clearAll,
  handleSelect,
  showFilters,
}) => (
  <div className="pl-6 md:pl-0 mb-6">
    <button
      onClick={handleFilterToggle}
      type="button"
      className="flex items-center px-2 py-2 border-solid border border-black-600 rounded-lg focus:outline-none"
    >
      <p className="font-bold pr-2">Causes</p>
      <MenuCarat
        cssStyles={
          showFilters
            ? css`
                transform: rotate(180deg);
              `
            : null
        }
      />
    </button>
    <Media
      queries={{
        large: '(min-width: 960px)',
      }}
    >
      {matches => (
        <>
          {matches.large ? (
            <>
              <CampaignsFilters
                clearAll={clearAll}
                handleSelect={handleSelect}
                handleFilterToggle={handleFilterToggle}
                showFilters={showFilters}
              />
            </>
          ) : (
            <>
              {showFilters ? (
                <Modal onClose={() => handleFilterToggle()}>
                  <CampaignsFilters
                    clearAll={clearAll}
                    handleSelect={handleSelect}
                    handleFilterToggle={handleFilterToggle}
                    showFilters={showFilters}
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

FilterNavigation.propTypes = {
  clearAll: PropTypes.func.isRequired,
  handleFilterToggle: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired,
};

export default FilterNavigation;
