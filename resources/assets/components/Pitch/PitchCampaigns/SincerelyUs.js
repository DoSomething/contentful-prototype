import React from 'react';

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

const headerOne = (
  <div>
    <h1>It’s a tough time to be <span>Muslim</span> in America.</h1>
    <p>“Our muslim community not only in the US, but all across the globe is being marginalized
    and hated simply because of their religion. By participating in this project I am trying
    to show that not all Americans feel this way towards the Muslim community and I hope it
    helps spread awareness that we are all the human beings and all deserve the same human
    rights.” - Ryan, 16</p>
  </div>
);
const headerTwo = (<h1>Hate crimes against Muslims spiked 67% in 2015, and things have’t gotten much better since then.</h1>); // eslint-disable-line max-len
const headerThree = (<h1>That’s why this summer, we’re sending handmade Happy Ramadan cards to every single mosque in the country.</h1>); // eslint-disable-line max-len
const headerFour = (
  <div>
    <h1>Let’s do this.</h1>
    <button className="button">Make Cards</button>
  </div>
);

const PitchSincerelyUs = () => (
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
      <PitchHeader position="middle" align="center" color="#FFF" background="transparent">
        { headerThree }
      </PitchHeader>
    </PitchContainer>
    <PitchContainer background={whiteAndBlack} halfHeight>
      <PitchHeader type="extra-large" position="middle" align="center" color="#222" background="#FFF">
        { headerFour }
      </PitchHeader>
    </PitchContainer>
  </div>
);

export default PitchSincerelyUs;
