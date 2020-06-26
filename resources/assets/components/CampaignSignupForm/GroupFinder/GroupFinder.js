import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import GroupSelect from './GroupSelect';
import UsaStateSelect from '../../utilities/UsaStateSelect';

const ANALYTICS_EVENT_CATEGORY = EVENT_CATEGORIES.campaignAction;
const ANALYTICS_EVENT_LABEL = 'group_finder';

const GroupFinder = ({ context, groupType, onChange }) => {
  const [groupState, setGroupState] = useState(null);

  const handleGroupSelectFocus = () => {
    trackAnalyticsEvent(`focused_${ANALYTICS_EVENT_LABEL}_group`, {
      action: 'field_focused',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  const handleGroupStateSelectChange = selected => {
    setGroupState(selected.abbreviation);

    trackAnalyticsEvent(`clicked_${ANALYTICS_EVENT_LABEL}_state`, {
      action: 'form_clicked',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  const handleGroupStateSelectFocus = () => {
    trackAnalyticsEvent(`focused_${ANALYTICS_EVENT_LABEL}_state`, {
      action: 'field_focused',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  const { filterByState } = groupType;

  return (
    <>
      {filterByState ? (
        <div className="pb-3">
          <p className="font-bold pb-1">Select your state</p>
          <UsaStateSelect
            onChange={handleGroupStateSelectChange}
            onFocus={handleGroupStateSelectFocus}
          />
        </div>
      ) : null}
      {!filterByState || (filterByState && groupState) ? (
        <div className="pb-3">
          <p className="font-bold pb-1">Select your chapter location</p>
          <GroupSelect
            groupState={groupState}
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
