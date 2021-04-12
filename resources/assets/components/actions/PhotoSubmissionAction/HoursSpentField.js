import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Query from '../../Query';

const ACTION_QUERY = gql`
  query ActionQuery($actionId: Int!) {
    action(id: $actionId) {
      id
      volunteerCredit
    }
  }
`;

const HoursSpentField = ({ actionId, hasError }) => (
  <Query query={ACTION_QUERY} variables={{ actionId }}>
    {response =>
      get(response, 'action.volunteerCredit') ? (
        <fieldset className="form-item" data-testid="hours_spent">
          <legend className="field-label">
            How long did this action take?
          </legend>

          <div className="flex">
            <label
              className={classnames('flex flex-wrap mr-4', {
                'has-error': hasError,
              })}
              htmlFor="hoursSpentHours"
            >
              <input
                className={classnames('text-field w-16 mr-2', {
                  'has-error shake': hasError,
                })}
                type="number"
                id="hoursSpentHours"
                name="hoursSpentHours"
                placeholder={0}
                required
                min={0}
              />

              <span className="self-center font-normal">hours</span>
            </label>

            <label
              className={classnames('flex flex-wrap', {
                'has-error': hasError,
              })}
              htmlFor="hoursSpentMinutes"
            >
              <input
                className={classnames('text-field w-16 mr-2', {
                  'has-error shake': hasError,
                })}
                type="number"
                id="hoursSpentMinutes"
                name="hoursSpentMinutes"
                placeholder={0}
                required
                min={0}
                max={59}
              />

              <span className="self-center font-normal">minutes</span>
            </label>
          </div>
        </fieldset>
      ) : null
    }
  </Query>
);

HoursSpentField.propTypes = {
  actionId: PropTypes.number.isRequired,
  hasError: PropTypes.bool,
};

HoursSpentField.defaultProps = {
  hasError: false,
};

export default HoursSpentField;
