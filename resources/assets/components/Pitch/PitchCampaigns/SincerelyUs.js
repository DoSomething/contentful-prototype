import React from 'react';
import PropTypes from 'prop-types';

import PitchHeader from '../PitchHeader';
import PitchContainer from '../PitchContainer';
import { PitchFlex, PitchFlexCell } from '../PitchFlex';
import PitchLineChart from '../PitchLineChart';

// TODO: Better way of loading data sets so we dont have all of them in the JS bundle.
import IncidentsAgainstMuslims from './data/IncidentsAgainstMuslims.json';

const cardVideo = {
  type: 'video',
  data: {
    poster: 'https://static.dosomething.org/onboarding/Screen%20Shot%202017-05-30%20at%209.55.17%20AM.png',
    sources: [
      {
        uri: 'https://static.dosomething.org/onboarding/S-US_Homepage%20Tile_4.mp4',
        type: 'mp4',
      },
      {
        uri: 'https://static.dosomething.org/onboarding/S-US_Homepage_Tile_4.webm',
        type: 'webm',
      },
      {
        uri: 'http://vjs.zencdn.net/v/oceans.ogv',
        type: 'ogv',
      },
    ],
  },
};

const blackAndWhite = { type: 'color', data: '#222' };
const whiteAndBlack = { type: 'color', data: '#FFF' };

/* eslint-disable max-len */
const headerOne = (
  <div>
    <h1>It’s a tough time to be <span>Muslim</span> in America.</h1>
    <p>Hate crimes against Muslim Americans have reached frightening levels in the past couple of years.</p>
  </div>
);
/* eslint-enable */

const headerTwo = (<h1>HATE CRIMES AGAINST MUSLIMS SPIKED 67% IN 2015, AND THINGS LOOK LIKE THEY’RE GETTING WORSE.</h1>); // eslint-disable-line max-len
const headerThree = (<h1>THAT’S WHY THIS SUMMER, WE’RE SENDING HANDMADE HAPPY RAMADAN CARDS TO EVERY SINGLE MOSQUE IN THE COUNTRY.</h1>); // eslint-disable-line max-len

const PitchSincerelyUs = (props) => {
  const {
    campaignId,
    totalCampaignSignups,
    clickedSignUp,
    convertExperiment,
    experiment,
  } = props;

  const onClick = () => {
    clickedSignUp(campaignId, { source: 'pitch page' });
    convertExperiment(experiment);
  };

  const headerFour = (
    <div>
      <h1>JOIN {totalCampaignSignups} PEOPLE SENDING LETTERS OF SUPPORT.</h1>
      <p>TOGETHER, WE’RE SENDING A BEAUTIFUL MESSAGE OF SUPPORT TO EVERY MOSQUE IN AMERICA.</p>
      <button className="button" onClick={onClick}>GET STARTED</button>
    </div>
  );

  return (
    <div className="pitch-sincerely-us">
      <PitchContainer background={blackAndWhite} scrollHint>
        <PitchHeader position="middle" align="center" color="#FFF" background="#222">
          { headerOne }
        </PitchHeader>
      </PitchContainer>
      <PitchContainer background={whiteAndBlack} padding={false}>
        <PitchFlex>
          <PitchFlexCell width="half" padding>
            <PitchHeader position="middle" type="medium" color="#222" background="#FFF">
              { headerTwo }
            </PitchHeader>
          </PitchFlexCell>
          <PitchFlexCell width="half">
            <PitchLineChart color={{ primary: '#222', secondary: '#ddd' }} dataset={IncidentsAgainstMuslims} />
          </PitchFlexCell>
        </PitchFlex>
      </PitchContainer>
      <PitchContainer background={cardVideo}>
        <PitchHeader type="medium" position="middle" align="center" color="#FFF" background="transparent">
          { headerThree }
        </PitchHeader>
      </PitchContainer>
      <PitchContainer background={whiteAndBlack} halfHeight>
        <PitchHeader type="medium" position="middle" align="center" color="#222" background="#FFF">
          { headerFour }
        </PitchHeader>
      </PitchContainer>
    </div>
  );
};

PitchSincerelyUs.propTypes = {
  campaignId: PropTypes.string.isRequired,
  totalCampaignSignups: PropTypes.number.isRequired,
  clickedSignUp: PropTypes.func.isRequired,
  convertExperiment: PropTypes.func.isRequired,
  experiment: PropTypes.string,
};

PitchSincerelyUs.defaultProps = {
  experiment: null,
};

export default PitchSincerelyUs;
