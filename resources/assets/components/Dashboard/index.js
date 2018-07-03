import React from 'react';
import PropTypes from 'prop-types';

import { Flex, FlexCell } from '../Flex';
import Share from '../utilities/Share/Share';
import { getDaysBetween } from '../../helpers';

import './dashboard.scss';

class Dashboard extends React.Component {
  /**
   * Replace the given text with variables from the props.
   * @TODO: This should not be defined in the render function.
   *
   * @param  {String} text
   * @return {String}
   */
  replaceTemplateVars(text) {
    return text.replace(
      '{endDate}',
      getDaysBetween(new Date(), new Date(this.props.endDate.date)),
    );
  }

  /**
   * Render the dashboard.
   * @param props
   * @returns {XML}
   * @constructor
   */
  render() {
    return (
      <Flex>
        <FlexCell width="full">
          <div className="dashboard">
            <div className="dashboard__block -quarter">
              <h1>
                {this.replaceTemplateVars(this.props.content.fields.firstValue)}
              </h1>
              <span>
                {this.replaceTemplateVars(
                  this.props.content.fields.firstDescription,
                )}
              </span>
            </div>
            <div className="dashboard__block -quarter">
              <h1>
                {this.replaceTemplateVars(
                  this.props.content.fields.secondValue,
                )}
              </h1>
              <span>
                {this.replaceTemplateVars(
                  this.props.content.fields.secondDescription,
                )}
              </span>
            </div>
            <div className="dashboard__block -half">
              <Flex>
                <div className="dashboard__block -half">
                  <h2>
                    {this.replaceTemplateVars(
                      this.props.content.fields.shareHeader,
                    )}
                  </h2>
                  <p>
                    {this.replaceTemplateVars(
                      this.props.content.fields.shareCopy,
                    )}
                  </p>
                </div>
                <div className="dashboard__block -half">
                  <Share variant="black" parentSource="dashboard" />
                </div>
              </Flex>
            </div>
          </div>
        </FlexCell>
      </Flex>
    );
  }
}

Dashboard.propTypes = {
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
