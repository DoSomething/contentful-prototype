import React from 'react';

import PitchHeader from '../PitchHeader';
import PitchContainer from '../PitchContainer';
import { PitchFlex, PitchFlexCell } from '../PitchFlex';
import PitchBarChart from '../PitchBarChart';

// TODO: Better way of loading data sets so we dont have all of them in the JS bundle.
import IncidentsAgainstMuslims from './data/IncidentsAgainstMuslims.json';

const testVideo = {
  type: 'video',
  data: {
    poster: 'http://vjs.zencdn.net/v/oceans.png',
    sources: [
      {
        uri: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'mp4',
      },
      {
        uri: 'http://vjs.zencdn.net/v/oceans.webm',
        type: 'webm',
      },
      {
        uri: 'http://vjs.zencdn.net/v/oceans.ogv',
        type: 'ogv',
      },
    ],
  },
};

const blackAndWhite = { type: 'color', data: '#111' };
const whiteAndBlack = { type: 'color', data: '#FFF' };

const headerOne = (<h1>It’s a tough time to be <span>Muslim</span> in America.</h1>);
const headerTwo = (<h1>Hate crimes against Muslims spiked 67% in 2015, and things have’t gotten much better since then.</h1>); // eslint-disable-line max-len
const headerThree = (<h1>That’s why this summer, we’re sending handmade Happy Ramadan cards to every single mosque in the country.</h1>); // eslint-disable-line max-len
const headerFour = (<div><h1>Let’s do this.</h1><button className="button">Join Us</button></div>);

const PitchSincerelyUs = () => (
  <div className="pitch-sincerely-us">
    <PitchContainer background={blackAndWhite}>
      <PitchHeader position="middle" align="center" color="#FFF" background="#111">
        { headerOne }
      </PitchHeader>
    </PitchContainer>
    <PitchContainer background={whiteAndBlack} padding={false}>
      <PitchFlex>
        <PitchFlexCell width="half" padding>
          <PitchHeader position="middle" type="medium" color="#111" background="#FFF">
            { headerTwo }
          </PitchHeader>
        </PitchFlexCell>
        <PitchFlexCell width="half">
          <PitchBarChart foreground="#111" background="#FFF" dataset={IncidentsAgainstMuslims} />
        </PitchFlexCell>
      </PitchFlex>
    </PitchContainer>
    <PitchContainer background={testVideo}>
      <PitchHeader position="middle" align="center" color="#FFF" background="transparent">
        { headerThree }
      </PitchHeader>
    </PitchContainer>
    <PitchContainer padding={false}>
      <PitchFlex>
        <PitchFlexCell width="one-third" padding>
          <PitchHeader position="middle" align="center" color="#FFF" type="medium">
            <h1>Make cards</h1>
          </PitchHeader>
        </PitchFlexCell>
        <PitchFlexCell width="one-third" padding>
          <PitchHeader position="middle" align="center" color="#FFF" type="medium">
            <h1>Mail them</h1>
          </PitchHeader>
        </PitchFlexCell>
        <PitchFlexCell width="one-third" padding>
          <PitchHeader position="middle" align="center" color="#FFF" type="medium">
            <h1>Join us</h1>
          </PitchHeader>
        </PitchFlexCell>
      </PitchFlex>
    </PitchContainer>
    <PitchContainer background={whiteAndBlack}>
      <PitchHeader position="middle" align="center" color="#111" background="#FFF">
        { headerFour }
      </PitchHeader>
    </PitchContainer>
  </div>
);

export default PitchSincerelyUs;
