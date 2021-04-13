import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { useState, useEffect } from 'react';

import Query from '../../Query';
import TooltipQuestionMark from '../../utilities/Tooltip/TooltipQuestionMark';

const ACTION_QUERY = gql`
  query ActionQuery($actionId: Int!) {
    action(id: $actionId) {
      id
      volunteerCredit
    }
  }
`;

const HoursSpentField = ({ actionId, hasError, onChange }) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  useEffect(() => {
    onChange((Number(hours) * 60 + Number(minutes)) / 60);
  }, [hours, minutes]);

  return (
    <Query query={ACTION_QUERY} variables={{ actionId }}>
      {response =>
        get(response, 'action.volunteerCredit') ? (
          <fieldset className="form-item" data-testid="hours_spent">
            <legend
              className={classnames('field-label', {
                'has-error': hasError,
              })}
            >
              How long did this action take?
              <TooltipQuestionMark tooltipContent="The number of hours you report should reflect the time it took you to complete this action. Please ensure that the number of hours you are reporting is accurate or your post will be rejected." />
            </legend>

            <div className="flex">
              <label
                className={classnames('flex flex-wrap mr-4', {
                  'has-error': hasError,
                })}
                htmlFor="hours"
              >
                <input
                  className={classnames('text-field w-16 mr-2', {
                    'has-error shake': hasError,
                  })}
                  type="number"
                  id="hours"
                  name="hours"
                  placeholder={0}
                  required
                  min={0}
                  onChange={event => setHours(event.target.value)}
                  value={hours}
                />

                <span className="self-center font-normal">hours</span>
              </label>

              <label
                className={classnames('flex flex-wrap', {
                  'has-error': hasError,
                })}
                htmlFor="minutes"
              >
                <input
                  className={classnames('text-field w-16 mr-2', {
                    'has-error shake': hasError,
                  })}
                  type="number"
                  id="minutes"
                  name="minutes"
                  placeholder={0}
                  required
                  min={0}
                  max={59}
                  value={minutes}
                  onChange={event => setMinutes(event.target.value)}
                />

                <span className="self-center font-normal">minutes</span>
              </label>
            </div>
          </fieldset>
        ) : null
      }
    </Query>
  );
};

HoursSpentField.propTypes = {
  onChange: PropTypes.func.isRequired,
  actionId: PropTypes.number.isRequired,
  hasError: PropTypes.bool,
};

HoursSpentField.defaultProps = {
  hasError: false,
};

export default HoursSpentField;
