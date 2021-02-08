import React, { useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import ActionLocationInput, {
  actionLocationLabels,
} from './ActionLocationInput';
import ActionTypeInput, { actionTypeLabels } from './ActionTypeInput';
import ElementButton from '../../../../utilities/Button/ElementButton';

/**
 * Filter menu form with series of checkbox inputs.
 *
 * @param {Object}
 */
const ActionFilter = ({ filters, setFilters }) => {
  const actionTypes = get(filters, 'actions.actionTypes', []);

  const [actionLocation, setActionLocation] = useState('');

  const handleActionTypeSelect = event => {
    if (actionTypes.includes(event.target.value)) {
      const newActionTypes = actionTypes.filter(actionType => {
        return actionType !== event.target.value;
      });
      setFilters({
        ...filters,
        actions: { ...filters.actions, actionTypes: [...newActionTypes] },
      });
    } else {
      setFilters({
        ...filters,
        actions: {
          ...filters.actions,
          actionTypes: [...actionTypes, event.target.value],
        },
      });
    }
  };

  const handleActionLocationSelect = event => {
    if (event.target.value === 'online' && actionLocation !== 'online') {
      setFilters({
        ...filters,
        actions: {
          ...filters.actions,
          isOnline: true,
        },
      });
      setActionLocation(event.target.value);
    } else if (
      event.target.value === 'in-person' &&
      actionLocation !== 'in-person'
    ) {
      setFilters({
        ...filters,
        actions: {
          ...filters.actions,
          isOnline: false,
        },
      });
      setActionLocation(event.target.value);
    } else if (
      (event.target.value === 'in-person' && actionLocation === 'in-person') ||
      (event.target.value === 'online' && actionLocation === 'online')
    ) {
      setFilters({
        ...filters,
        actions: {
          ...filters.actions,
          isOnline: null,
        },
      });
      setActionLocation('');
    }
  };

  const clearAllSelected = () => {
    if (actionTypes) {
      setFilters({
        ...filters,
        actions: { actionTypes: [], isOnline: null },
      });
    }
    setActionLocation('');
  };

  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-4">
        <div className="mb-6 lg:mb-0">
          <h2 className="font-bold text-base pb-3">Location</h2>
          {Object.keys(actionLocationLabels).map(actionLocationLabel => {
            return (
              <ActionLocationInput
                key={actionLocationLabel}
                handleSelect={handleActionLocationSelect}
                actionLocationName={actionLocationLabels[actionLocationLabel]}
                actionLocationValue={actionLocationLabel}
                isChecked={actionLocationLabel === actionLocation}
              />
            );
          })}
        </div>
        <div className="col-span-2">
          <h2 className="font-bold text-base pb-3">Type</h2>
          <div className="lg:grid lg:grid-cols-2">
            {Object.keys(actionTypeLabels).map(actionType => {
              return (
                <ActionTypeInput
                  key={actionType}
                  handleSelect={handleActionTypeSelect}
                  actionTypeName={actionTypeLabels[actionType]}
                  actionTypeValue={actionType}
                  isChecked={actionTypes.includes(actionType)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-start py-2">
        <ElementButton
          className="font-bold p-2 text-blue-500 hover:text-blue-300"
          text="clear"
          onClick={clearAllSelected}
        />
      </div>
    </form>
  );
};

ActionFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default ActionFilter;
