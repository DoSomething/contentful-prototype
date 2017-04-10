import React from 'react';
import { Flex, FlexCell } from '../Flex';
import ShareContainer from '../../containers/ShareContainer';
import Markdown from '../Markdown';
import './dashboard.scss';

const Dashboard = (props) => {
  return (
    <Flex>
      <FlexCell width='full'>
        <div className='dashboard'>
          <div className='dashboard__block -quarter'>
            <h1>45 days</h1>
            <span>until campaign closes</span>
          </div>
          <div className='dashboard__block -quarter'>
            <h1>24,583</h1>
            <span>members supporting</span>
          </div>
          <div className='dashboard__block -half'>
            <Flex>
              <div className='dashboard__block -half'>
                <h2>Share this campaign</h2>
                <p>On average, each share means 3 more people registering as bone marrow donors.</p>
              </div>
              <div className='dashboard__block -half'>
                <ShareContainer variant="black" parentSource="dashboard" />
              </div>
            </Flex>
          </div>
        </div>
      </FlexCell>
    </Flex>
  );
};

export default Dashboard;

/*
<div className='dashboard__share'>
  <h2>Share this campaign</h2>
  <p>On average, each share means 3 more people registering as bone marrow donors.</p>
</div>
<ShareContainer variant="black" parentSource="dashboard" />
 */
