import Media from 'react-media';
import React, { useState } from 'react';
import { css } from '@emotion/core';

import Modal from '../../utilities/Modal/Modal';
import MenuCarat from '../../artifacts/MenuCarat/MenuCarat';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import CampaignsFilters from './CampaignsFilters/CampaignsFilters';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

const CampaignsIndexPage = () => {
  const [causes, setCauses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSelect = event => {
    if (causes.includes(event.target.value)) {
      console.log('is there a checked? on target', event.target);
      const newCauses = causes.filter(cause => {
        return cause !== event.target.value;
      });
      setCauses([...newCauses]);
    } else {
      setCauses([...causes, event.target.value]);
    }
  };

  const clearAll = () => {
    setCauses([]);
  };

  const handleFilterToggle = () => setShowFilters(!showFilters);

  return (
    <>
      <SiteNavigationContainer />
      <main className="md:w-3/4 mx-auto">
        <h1 className="w-full my-6 pl-6 md:pl-0">Explore Campaigns</h1>
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
        </div>
        <Media
          queries={{
            large: '(min-width: 960px)',
          }}
        >
          {matches => (
            <>
              {matches.large ? (
                <div className="pl-6 md:pl-0 m-2 md:w-1/2">
                  <CampaignsFilters
                    clearAll={clearAll}
                    handleSelect={handleSelect}
                    handleFilterToggle={handleFilterToggle}
                    showFilters={showFilters}
                  />
                </div>
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

        <PaginatedCampaignGallery
          className="grid-full px-6 md:px-0"
          itemsPerRow={4}
          variables={{
            isOpen: true,
            first: 36,
            orderBy: 'start_date,desc',
            causes,
          }}
        />
      </main>
      <SiteFooter />
    </>
  );
};

export default CampaignsIndexPage;
