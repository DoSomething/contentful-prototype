import PropTypes from 'prop-types';
import React from 'react';
import { Flex, FlexCell } from '../Flex';
import { ShareContainer } from '../Share';
import { getDaysBetween } from '../../helpers';
import './dashboard.scss';

/**
 * Render the dashboard.
 * @param props
 * @returns {XML}
 * @constructor
 */
const Dashboard = (props) => {
  /**
   * Replace the given text with variables from the props.
   * @TODO: This should not be defined in the render function.
   *
   * @param  {String} text
   * @return {String}
   */
  function replaceTemplateVars(text) {
    return text
      .replace('{totalSignups}', props.totalCampaignSignups.toLocaleString())
      .replace('{endDate}', getDaysBetween(new Date(), new Date(props.endDate.date)));
  }

  return (
    <Flex>
      <FlexCell width="full">
        <div className="dashboard">
          <div className="dashboard__block -quarter">
            <h1>{ replaceTemplateVars(props.content.fields.firstValue) }</h1>
            <span>{ replaceTemplateVars(props.content.fields.firstDescription) }</span>
          </div>
          <div className="dashboard__block -quarter">
            <h1>{ replaceTemplateVars(props.content.fields.secondValue) }</h1>
            <span>{ replaceTemplateVars(props.content.fields.secondDescription) }</span>
          </div>
          <div className="dashboard__block -half">
            <Flex>
              <div className="dashboard__block -half">
                <h2>{ replaceTemplateVars(props.content.fields.shareHeader) }</h2>
                <p>{ replaceTemplateVars(props.content.fields.shareCopy) }</p>
              </div>
              <div className="dashboard__block -half">
                <ShareContainer variant="black" parentSource="dashboard" />
              </div>
            </Flex>
          </div>
        </div>
      </FlexCell>
    </Flex>
  );
};

Dashboard.propTypes = {
  totalCampaignSignups: PropTypes.number.isRequired,
  endDate: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
  content: PropTypes.shape({
    fields: PropTypes.shape({
      firstValue: PropTypes.string.isRequired,
      firstDescription: PropTypes.string.isRequired,
      secondValue: PropTypes.string.isRequired,
      secondDescription: PropTypes.string.isRequired,
      shareHeader: PropTypes.string.isRequired,
      shareCopy: PropTypes.string.isRequired,
    }),
  }),
};

Dashboard.defaultProps = {
  content: {
    fields: {
      // ...!
    },
  },
};

export default Dashboard;
