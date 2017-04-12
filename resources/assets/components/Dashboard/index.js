import React from 'react';
import { Flex, FlexCell } from '../Flex';
import ShareContainer from '../../containers/ShareContainer';
import Markdown from '../Markdown';
import { getDaysBetween } from '../../helpers';
import './dashboard.scss';

const Dashboard = (props) => {
  /**
   * Replace the given text with variables from the props.
   *
   * @param  {String} text
   * @return {String}
   */
  function replaceTemplateVars(text) {
    text = text.replace('{totalSignups}', props.totalSignups.toLocaleString());
    text = text.replace('{endDate}', getDaysBetween(new Date(), new Date(props.endDate.date)));

    return text;
  }

  return (
    <Flex>
      <FlexCell width='full'>
        <div className='dashboard'>
          <div className='dashboard__block -quarter'>
            <h1>{ replaceTemplateVars(props.content.fields.leftValue) }</h1>
            <span>{ replaceTemplateVars(props.content.fields.leftDescription) }</span>
          </div>
          <div className='dashboard__block -quarter'>
            <h1>{ replaceTemplateVars(props.content.fields.rightValue) }</h1>
            <span>{ replaceTemplateVars(props.content.fields.rightDescription) }</span>
          </div>
          <div className='dashboard__block -half'>
            <Flex>
              <div className='dashboard__block -half'>
                <h2>{ replaceTemplateVars(props.content.fields.shareHeader) }</h2>
                <p>{ replaceTemplateVars(props.content.fields.shareCopy) }</p>
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
