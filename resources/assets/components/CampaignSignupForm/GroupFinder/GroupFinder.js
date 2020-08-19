import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import GroupSelect from './GroupSelect';
// TODO: We should deprecate this for SelectLocationDropdown, but have to pass style overrides.
import UsaStateSelect from '../../utilities/UsaStateSelect';

const ANALYTICS_EVENT_CATEGORY = EVENT_CATEGORIES.campaignAction;
const ANALYTICS_EVENT_LABEL = 'group_finder';

const GroupFinder = ({ context, groupType, onChange }) => {
  const [groupLocation, setGroupLocation] = useState(null);

  const handleGroupSelectFocus = () => {
    trackAnalyticsEvent(`focused_${ANALYTICS_EVENT_LABEL}_group`, {
      action: 'field_focused',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  const handleGroupLocationSelectChange = selected => {
    setGroupLocation(selected.value);

    trackAnalyticsEvent(`clicked_${ANALYTICS_EVENT_LABEL}_state`, {
      action: 'form_clicked',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  const handleGroupLocationSelectFocus = () => {
    trackAnalyticsEvent(`focused_${ANALYTICS_EVENT_LABEL}_state`, {
      action: 'field_focused',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  const { filterByLocation } = groupType;
  const groupLabel = 'chapter';

  return (
    <>
      {filterByLocation ? (
        <div className="pb-3">
          <p className="font-bold text-sm py-1">Select your state</p>
          <UsaStateSelect
            onChange={handleGroupLocationSelectChange}
            onFocus={handleGroupLocationSelectFocus}
          />
        </div>
      ) : null}
      {!filterByLocation || (filterByLocation && groupLocation) ? (
        <div className="pb-3">
          <p className="font-bold text-sm py-1">Select your {groupLabel}</p>
          <GroupSelect
            groupLabel={groupLabel}
            groupLocation={groupLocation}
            groupTypeId={groupType.id}
            onChange={onChange}
            onFocus={handleGroupSelectFocus}
          />
        </div>
      ) : null}
    </>
  );
};

GroupFinder.propTypes = {
  context: PropTypes.object.isRequired,
  groupType: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupFinder;
