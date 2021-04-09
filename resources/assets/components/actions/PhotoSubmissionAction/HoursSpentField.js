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

const HoursSpentField = ({ actionId, onChange, hasError, value }) => (
  <Query query={ACTION_QUERY} variables={{ actionId }}>
    {response =>
      get(response, 'action.volunteerCredit') ? (
        <div className="form-item" data-testid="hours_spent">
          <label
            className={classnames('field-label', {
              'has-error': hasError,
            })}
            htmlFor="hoursSpent"
          >
            How many hours did this action take?
            <input
              className={classnames('text-field', {
                'has-error shake': hasError,
              })}
              type="number"
              step="0.01"
              id="hoursSpent"
              name="hoursSpent"
              placeholder={`Use numbers (e.g. "1.5" or "3")`}
              value={value}
              onChange={onChange}
              required
              min={0.1}
            />
          </label>
        </div>
      ) : null
    }
  </Query>
);

HoursSpentField.propTypes = {
  actionId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  value: PropTypes.string,
};

HoursSpentField.defaultProps = {
  hasError: false,
  value: '',
};

export default HoursSpentField;
